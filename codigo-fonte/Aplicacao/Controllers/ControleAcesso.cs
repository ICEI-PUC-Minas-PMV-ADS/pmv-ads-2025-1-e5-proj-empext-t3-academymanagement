using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Gym.Data;
using BCrypt.Net;
using Gym.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Gym.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AcessoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AcessoController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        #region Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login loginDTO)
        {
            var usuario = await _context.Usuarios
                .Include(u => u.PerfilUsuario)
                .FirstOrDefaultAsync(u => u.Email == loginDTO.Email);

            if (usuario == null)
                return Unauthorized(new { mensagem = "Usuário não encontrado" });

            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, usuario.Senha))
                return Unauthorized(new { mensagem = "Senha inválida" });

            var token = GerarToken(usuario);

            usuario.Token = token; 
            await _context.SaveChangesAsync();

            var usuarioLogado = new
            {
                id = usuario.IdUsuario,
                primeiroNome = usuario.PrimeiroNome,
                sobrenome = usuario.Sobrenome,
                email = usuario.Email,
                ativo = usuario.Ativo,
                idPerfilUsuario = usuario.IdPerfilUsuario,
                perfilUsuario = usuario.PerfilUsuario,
                token = token
            };

            return Ok(usuarioLogado);
        }
        #endregion

        #region Usuario Logado
        [Authorize]
        [HttpGet("ObterUsuarioLogado")]
        public async Task<IActionResult> ObterUsuarioLogado()
        {
            var usuarioId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var tokenAtual = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(usuarioId)) return Unauthorized("Usuário não autenticado.");

            var usuario = await _context.Usuarios
                .Include(u => u.PerfilUsuario)
                .FirstOrDefaultAsync(u => u.IdUsuario == int.Parse(usuarioId));

            if (usuario == null) return NotFound("Usuário não encontrado.");

         
            if (string.IsNullOrEmpty(usuario.Token) || usuario.Token != tokenAtual)
                return Unauthorized("Sessão expirada ou inválida. Realize login novamente.");

            var usuarioLogado = new
            {
                id = usuario.IdUsuario,
                primeiroNome = usuario.PrimeiroNome,
                sobrenome = usuario.Sobrenome,
                email = usuario.Email,
                ativo = usuario.Ativo,
                idPerfilUsuario = usuario.IdPerfilUsuario,
                perfilUsuario = usuario.PerfilUsuario
            };

            return Ok(usuarioLogado);
        }

        [Authorize]
        [HttpPost("logoff")]
        public async Task<IActionResult> Logoff()
        {
            var usuarioId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (usuarioId == null)
                return Unauthorized();

            var usuario = await _context.Usuarios.FindAsync(int.Parse(usuarioId));

            if (usuario == null)
                return NotFound("Usuário não encontrado.");

            usuario.Token = null; 
            await _context.SaveChangesAsync();

            return Ok("Logoff realizado com sucesso.");
        }
        #endregion

        #region token
        private string GerarToken(Usuario usuario)
        {
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Secret"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Email, usuario.Email),
                    new Claim("DataLogin", DateTime.UtcNow.ToString()),
                    new Claim("PerfilUsuario", usuario.IdPerfilUsuario.ToString()) 
                }),
                Expires = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["JwtSettings:ExpiracaoHoras"])),
                Issuer = _configuration["JwtSettings:Issuer"],
                Audience = _configuration["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
    #endregion
}
