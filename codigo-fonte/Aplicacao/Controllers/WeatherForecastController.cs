using Microsoft.AspNetCore.Mvc;
using Gym.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Gym.Data;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Hangfire;

namespace Gym.Controllers
{

    #region Alunos
    [ApiController]
    [Route("[controller]")]
    public class AlunosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AlunosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirAluno(Aluno aluno)
        {
            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();
            return Ok(aluno);
        }

        [HttpPut("atualizar/{id}")]
        public async Task<IActionResult> AtualizarAluno(int id, Aluno alunoAtualizado)
        {
            if (id != alunoAtualizado.IdAluno)
                return BadRequest("ID do aluno não corresponde.");

            var alunoExistente = await _context.Alunos.Include(a => a.Usuario).FirstOrDefaultAsync(a => a.IdAluno == id);
            if (alunoExistente == null)
                return NotFound("Aluno não encontrado.");

            alunoExistente.DataNascimento = alunoAtualizado.DataNascimento;
            alunoExistente.Sexo = alunoAtualizado.Sexo;
            alunoExistente.Telefone = alunoAtualizado.Telefone;
            alunoExistente.Endereco = alunoAtualizado.Endereco;

            if (!string.IsNullOrEmpty(alunoAtualizado.Usuario.PrimeiroNome))
                alunoExistente.Usuario.PrimeiroNome = alunoAtualizado.Usuario.PrimeiroNome;
            if (!string.IsNullOrEmpty(alunoAtualizado.Usuario.Sobrenome))
                alunoExistente.Usuario.Sobrenome = alunoAtualizado.Usuario.Sobrenome;

            await _context.SaveChangesAsync();
            return Ok(alunoExistente);
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarAluno(int id)
        {
            var alunoExistente = await _context.Alunos.FirstOrDefaultAsync(a => a.IdAluno == id);
            if (alunoExistente == null)
                return NotFound("Aluno não encontrado.");

            var pagamentosPendentes = await _context.Pagamentos.Where(p => p.IdAluno == id && p.Status == StatusPagamento.Pendente).ToListAsync();
            if (pagamentosPendentes.Any())
                return BadRequest("Não é possível deletar o aluno, pois existem pagamentos pendentes.");

            _context.Alunos.Remove(alunoExistente);
            await _context.SaveChangesAsync();
            return Ok("Aluno deletado com sucesso.");
        }
    }
    #endregion

    #region Pagamento
    [ApiController]
    [Route("[controller]")]
    public class PagamentoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PagamentoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirPagamento(Pagamento pagamento)
        {
            _context.Pagamentos.Add(pagamento);
            await _context.SaveChangesAsync();
            return Ok(pagamento);
        }

        [HttpPut("atualizar/{id}")]
        public async Task<IActionResult> AtualizarPagamento(int id, StatusPagamento status)
        {
            var pagamento = await _context.Pagamentos.FirstOrDefaultAsync(p => p.Id == id);
            if (pagamento == null)
                return NotFound("Pagamento não encontrado.");

            pagamento.Status = status;
            pagamento.DataPagamento = status == StatusPagamento.Pago ? DateTime.Now : (DateTime?)null;

            await _context.SaveChangesAsync();
            return Ok(pagamento);
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarPagamento(int id)
        {
            var pagamentoExistente = await _context.Pagamentos.FirstOrDefaultAsync(p => p.Id == id);
            if (pagamentoExistente == null)
                return NotFound("Pagamento não encontrado.");

            _context.Pagamentos.Remove(pagamentoExistente);
            await _context.SaveChangesAsync();
            return Ok("Pagamento deletado com sucesso.");
        }
    }
    #endregion

    #region Usuarios
    [ApiController]
    [Route("[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public UsuariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> IncluirUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(ObterUsuario), new { id = usuario.IdUsuario }, usuario);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarUsuario(int id, Usuario usuario)
        {
            if (id != usuario.IdUsuario) return BadRequest();
            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();
            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region PerfilUsuario
    [ApiController]
    [Route("[controller]")]
    public class PerfilUsuarioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PerfilUsuarioController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirPerfil(PerfilUsuario perfilUsuario)
        {
            _context.PerfisUsuarios.Add(perfilUsuario);
            await _context.SaveChangesAsync();
            return Ok(perfilUsuario);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPerfil(int id)
        {
            var perfil = await _context.PerfisUsuarios.FindAsync(id);
            if (perfil == null) return NotFound();
            return Ok(perfil);
        }

        [HttpPut("atualizar/{id}")]
        public async Task<IActionResult> AtualizarPerfil(int id, PerfilUsuario perfilAtualizado)
        {
            if (id != perfilAtualizado.IdPerfilUsuario) return BadRequest();
            _context.Entry(perfilAtualizado).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarPerfil(int id)
        {
            var perfil = await _context.PerfisUsuarios.FindAsync(id);
            if (perfil == null) return NotFound();
            _context.PerfisUsuarios.Remove(perfil);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region Permissao

    [ApiController]
    [Route("[controller]")]
    public class PermissaoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PermissaoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirPermissao(Permissao permissao)
        {
            _context.Permissoes.Add(permissao);
            await _context.SaveChangesAsync();
            return Ok(permissao);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPermissao(int id)
        {
            var permissao = await _context.Permissoes.FindAsync(id);
            if (permissao == null) return NotFound();
            return Ok(permissao);
        }

        [HttpPut("atualizar/{id}")]
        public async Task<IActionResult> AtualizarPermissao(int id, Permissao permissaoAtualizada)
        {
            if (id != permissaoAtualizada.IdPermissao) return BadRequest();
            _context.Entry(permissaoAtualizada).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarPermissao(int id)
        {
            var permissao = await _context.Permissoes.FindAsync(id);
            if (permissao == null) return NotFound();
            _context.Permissoes.Remove(permissao);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region Modalidade
    [ApiController]
    [Route("[controller]")]
    public class ModalidadeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ModalidadeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirModalidade(Modalidade modalidade)
        {
            _context.Modalidades.Add(modalidade);
            await _context.SaveChangesAsync();
            return Ok(modalidade);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterModalidade(int id)
        {
            var modalidade = await _context.Modalidades.FindAsync(id);
            if (modalidade == null) return NotFound();
            return Ok(modalidade);
        }

        [HttpPut("atualizar/{id}")]
        public async Task<IActionResult> AtualizarModalidade(int id, Modalidade modalidadeAtualizada)
        {
            if (id != modalidadeAtualizada.Id) return BadRequest();
            _context.Entry(modalidadeAtualizada).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarModalidade(int id)
        {
            var modalidade = await _context.Modalidades.FindAsync(id);
            if (modalidade == null) return NotFound();
            _context.Modalidades.Remove(modalidade);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region Instrutor

    [ApiController]
    [Route("[controller]")]
    public class InstrutorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InstrutorController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirInstrutor(Instrutor instrutor)
        {
            _context.Instrutores.Add(instrutor);
            await _context.SaveChangesAsync();
            return Ok(instrutor);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterInstrutor(int id)
        {
            var instrutor = await _context.Instrutores.FindAsync(id);
            if (instrutor == null) return NotFound();
            return Ok(instrutor);
        }

        [HttpPut("atualizar/{id}")]
        public async Task<IActionResult> AtualizarInstrutor(int id, Instrutor instrutorAtualizado)
        {
            if (id != instrutorAtualizado.Id) return BadRequest();
            _context.Entry(instrutorAtualizado).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarInstrutor(int id)
        {
            var instrutor = await _context.Instrutores.FindAsync(id);
            if (instrutor == null) return NotFound();
            _context.Instrutores.Remove(instrutor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region Matricula
    [ApiController]
    [Route("[controller]")]
    public class MatriculaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatriculaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirMatricula(Matricula matricula)
        {
            _context.Matriculas.Add(matricula);
            await _context.SaveChangesAsync();
            return Ok(matricula);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterMatricula(int id)
        {
            var matricula = await _context.Matriculas.FindAsync(id);
            if (matricula == null) return NotFound();
            return Ok(matricula);
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarMatricula(int id)
        {
            var matricula = await _context.Matriculas.FindAsync(id);
            if (matricula == null) return NotFound();
            _context.Matriculas.Remove(matricula);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region Presenca
    [ApiController]
    [Route("[controller]")]
    public class PresencaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PresencaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirPresenca(Presenca presenca)
        {
            _context.Presencas.Add(presenca);
            await _context.SaveChangesAsync();
            return Ok(presenca);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPresenca(int id)
        {
            var presenca = await _context.Presencas.FindAsync(id);
            if (presenca == null) return NotFound();
            return Ok(presenca);
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarPresenca(int id)
        {
            var presenca = await _context.Presencas.FindAsync(id);
            if (presenca == null) return NotFound();
            _context.Presencas.Remove(presenca);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region Progresso

    [ApiController]
    [Route("[controller]")]
    public class ProgressoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProgressoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirProgresso(Progresso progresso)
        {
            _context.Progressos.Add(progresso);
            await _context.SaveChangesAsync();
            return Ok(progresso);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterProgresso(int id)
        {
            var progresso = await _context.Progressos.FindAsync(id);
            if (progresso == null) return NotFound();
            return Ok(progresso);
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarProgresso(int id)
        {
            var progresso = await _context.Progressos.FindAsync(id);
            if (progresso == null) return NotFound();
            _context.Progressos.Remove(progresso);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region MensagemMotivacional
    [ApiController]
    [Route("[controller]")]
    public class MensagemMotivacionalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MensagemMotivacionalController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirMensagem(MensagemMotivacional mensagem)
        {
            _context.MensagensMotivacionais.Add(mensagem);
            await _context.SaveChangesAsync();
            return Ok(mensagem);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterMensagem(int id)
        {
            var mensagem = await _context.MensagensMotivacionais.FindAsync(id);
            if (mensagem == null) return NotFound();
            return Ok(mensagem);
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarMensagem(int id)
        {
            var mensagem = await _context.MensagensMotivacionais.FindAsync(id);
            if (mensagem == null) return NotFound();
            _context.MensagensMotivacionais.Remove(mensagem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    #endregion

    #region EnvioMensagem

    [ApiController]
    [Route("[controller]")]
    public class EnvioMensagemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EnvioMensagemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> InserirEnvioMensagem(EnvioMensagem envioMensagem)
        {
            _context.EnvioMensagens.Add(envioMensagem);
            await _context.SaveChangesAsync();
            AgendarEnvioMensagem(envioMensagem);
            return Ok(envioMensagem);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterEnvioMensagem(int id)
        {
            var envioMensagem = await _context.EnvioMensagens.FindAsync(id);
            if (envioMensagem == null) return NotFound();
            return Ok(envioMensagem);
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeletarEnvioMensagem(int id)
        {
            var envioMensagem = await _context.EnvioMensagens.FindAsync(id);
            if (envioMensagem == null) return NotFound();
            _context.EnvioMensagens.Remove(envioMensagem);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("cancelarEnvio/{id}")]
        public async Task<IActionResult> CancelarEnvioMensagem(int id)
        {
            var envioMensagem = await _context.EnvioMensagens.FindAsync(id);

            if (envioMensagem == null) return NotFound();

            // Marcando como cancelado em vez de excluir
            envioMensagem.Cancelado = true;

            _context.EnvioMensagens.Update(envioMensagem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private void AgendarEnvioMensagem(EnvioMensagem envioMensagem)
        {

            if (envioMensagem.DataEnvio > DateTime.Now)
            {
                var tempoDeEspera = envioMensagem.DataEnvio - DateTime.Now;


                BackgroundJob.Schedule(() => EnviarMensagemWhatsApp(envioMensagem), tempoDeEspera);
            }
            else
            {
               
                EnviarMensagemWhatsApp(envioMensagem);
            }
        }
        private void EnviarMensagemWhatsApp(EnvioMensagem envioMensagem)
        {
            if (envioMensagem.Cancelado)
            {
                return;
            }

            var accountSid = "your_twilio_account_sid";
            var authToken = "your_twilio_auth_token";
            TwilioClient.Init(accountSid, authToken);
            var numeroDestino = envioMensagem.Aluno.Telefone;
            var mensagem = envioMensagem.Mensagem.Texto;

            var mensagemWhatsApp = MessageResource.Create(
            body: mensagem,
            from: new Twilio.Types.PhoneNumber("whatsapp:+1415XXXXXXX"),
            to: new Twilio.Types.PhoneNumber($"whatsapp:{numeroDestino}")
            );
        }

    }
    #endregion

}
