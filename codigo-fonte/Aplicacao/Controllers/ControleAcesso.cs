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
    [Route("api/[controller]")]
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

            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Senha, usuario.Senha))
                return Unauthorized(new { mensagem = "Senha inválida" });

            var token = GerarToken(usuario);

            var usuarioLogado = new
            {
                id = usuario.IdUsuario,
                primeiroNome = usuario.PrimeiroNome,
                sobrenome = usuario.Sobrenome,
                email = usuario.Email,
                codigo = usuario.Codigo,
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

            if (usuarioId == null) return Unauthorized();

            var usuario = await _context.Usuarios
                .Include(u => u.PerfilUsuario)
                .FirstOrDefaultAsync(u => u.IdUsuario == int.Parse(usuarioId));

            if (usuario == null) return NotFound();

            var usuarioLogado = new
            {
                id = usuario.IdUsuario,
                primeiroNome = usuario.PrimeiroNome,
                sobrenome = usuario.Sobrenome,
                email = usuario.Email,
                codigo = usuario.Codigo,
                ativo = usuario.Ativo,
                idPerfilUsuario = usuario.IdPerfilUsuario,
                perfilUsuario = usuario.PerfilUsuario
            };

            return Ok(usuarioLogado);
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
