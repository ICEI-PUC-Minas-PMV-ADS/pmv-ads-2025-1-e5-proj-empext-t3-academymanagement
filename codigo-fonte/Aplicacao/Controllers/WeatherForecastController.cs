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
        public async Task<IActionResult> InserirAluno([FromBody] Aluno aluno)
        {
            if (aluno.Usuario == null)
                return BadRequest("Usuário é obrigatório.");

           
            _context.Usuarios.Add(aluno.Usuario);
            await _context.SaveChangesAsync();

            
            aluno.IdUsuario = aluno.Usuario.IdUsuario;
            aluno.Usuario = null;

            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();
            return Ok(aluno);
        }

        [HttpPut("atualizar/{idAluno}")]
        public async Task<IActionResult> AtualizarAluno(int idAluno, [FromBody] Aluno alunoAtualizado)
        {
            if (idAluno != alunoAtualizado.IdAluno)
                return BadRequest("ID do aluno não corresponde.");

            var alunoExistente = await _context.Alunos.Include(a => a.Usuario).FirstOrDefaultAsync(a => a.IdAluno == idAluno);
            if (alunoExistente == null)
                return NotFound("Aluno não encontrado.");

            alunoExistente.Matricula = alunoAtualizado.Matricula;

            if (alunoAtualizado.Usuario != null)
            {
                var usuario = alunoExistente.Usuario;

                usuario.PrimeiroNome = alunoAtualizado.Usuario.PrimeiroNome ?? usuario.PrimeiroNome;
                usuario.Sobrenome = alunoAtualizado.Usuario.Sobrenome ?? usuario.Sobrenome;
                usuario.Email = alunoAtualizado.Usuario.Email ?? usuario.Email;
                usuario.Senha = alunoAtualizado.Usuario.Senha ?? usuario.Senha;
                usuario.IdPerfilUsuario = alunoAtualizado.Usuario.IdPerfilUsuario != 0
                    ? alunoAtualizado.Usuario.IdPerfilUsuario
                    : usuario.IdPerfilUsuario;
                usuario.Sexo = alunoAtualizado.Usuario.Sexo;
                usuario.Endereco = alunoAtualizado.Usuario.Endereco ?? usuario.Endereco;
                usuario.Telefone = alunoAtualizado.Usuario.Telefone ?? usuario.Telefone;
                usuario.DataNascimento = alunoAtualizado.Usuario.DataNascimento;
            }

            await _context.SaveChangesAsync();
            return Ok("Aluno atualizado com sucesso.");
        }

        [HttpDelete("deletar/{idAluno}")]
        public async Task<IActionResult> DeletarAluno(int idAluno)
        {
            var alunoExistente = await _context.Alunos
    .Include(a => a.Usuario)
    .FirstOrDefaultAsync(a => a.IdAluno == idAluno);

            if (alunoExistente == null)
                return NotFound("Aluno não encontrado.");

            var pagamentosPendentes = await _context.Pagamentos
                .Where(p => p.IdAluno == idAluno && p.Status == StatusPagamento.Pendente)
                .ToListAsync();

            if (pagamentosPendentes.Any())
                return BadRequest("Não é possível deletar o aluno, pois existem pagamentos pendentes.");

        
            _context.Alunos.Remove(alunoExistente);

            if (alunoExistente.Usuario != null)
                _context.Usuarios.Remove(alunoExistente.Usuario);

            await _context.SaveChangesAsync();
            return Ok("Aluno e usuário deletados com sucesso.");
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
        public async Task<IActionResult> InserirPagamento([FromBody] Pagamento pagamento)
        {
            var alunoExiste = await _context.Alunos.AnyAsync(a => a.IdAluno == pagamento.IdAluno);
            if (!alunoExiste)
            {
                return BadRequest("O aluno com o ID informado não existe.");
            }

            _context.Pagamentos.Add(pagamento);
            await _context.SaveChangesAsync();
            return Ok(pagamento);
        }

        [HttpPut("atualizar/{idPagamento}")]
        public async Task<IActionResult> AtualizarPagamento(int idPagamento, [FromBody] StatusPagamento status)
        {
            var pagamento = await _context.Pagamentos.FirstOrDefaultAsync(p => p.IdPagamento == idPagamento);
            if (pagamento == null)
                return NotFound("Pagamento não encontrado.");

            pagamento.Status = status;
            pagamento.DataPagamento = status == StatusPagamento.Pago ? DateTime.Now : (DateTime?)null;

            await _context.SaveChangesAsync();
            return Ok(pagamento);
        }

        [HttpDelete("deletar/{idPagamento}")]
        public async Task<IActionResult> DeletarPagamento(int idPagamento)
        {
            var pagamentoExistente = await _context.Pagamentos.FirstOrDefaultAsync(p => p.IdPagamento == idPagamento);
            if (pagamentoExistente == null)
                return NotFound("Pagamento não encontrado.");

            _context.Pagamentos.Remove(pagamentoExistente);
            await _context.SaveChangesAsync();
            return Ok("Pagamento deletado com sucesso.");
        }

        [HttpGet("listarPagamentos")]
        public async Task<IActionResult> ListarPagamentosComAlunos()
        {
            var pagamentos = await _context.Pagamentos
                .Include(p => p.Aluno)
                .ToListAsync();

            return Ok(pagamentos);
        }
        [HttpGet("obter/{idPagamento}")]
        public async Task<IActionResult> BuscarPagamentoPorId(int idPagamento)
        {
            var pagamento = await _context.Pagamentos
                .Include(p => p.Aluno)
                .FirstOrDefaultAsync(p => p.IdPagamento == idPagamento);

            if (pagamento == null)
                return NotFound("Pagamento não encontrado.");

            return Ok(pagamento);
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

        [HttpPost("inserir")]
        public async Task<IActionResult> IncluirUsuario([FromBody] Usuario usuario)
        {
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);

            usuario.DataCriacao = DateTime.Now;
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(ObterUsuario), new { idUsuario = usuario.IdUsuario }, usuario);
        }

        [HttpGet("{idUsuario}")]
        public async Task<IActionResult> ObterUsuario(int idUsuario)
        {
            var usuario = await _context.Usuarios.FindAsync(idUsuario);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpPut("atualizar/{idUsuario}")]
        public async Task<IActionResult> AtualizarUsuario(int idUsuario, [FromBody] Usuario usuario)
        {
            if (idUsuario != usuario.IdUsuario)
                return BadRequest("ID do usuário não confere.");

            var usuarioExistente = await _context.Usuarios.FindAsync(idUsuario);
            if (usuarioExistente == null)
                return NotFound("Usuário não encontrado.");

            bool senhaEhHashValido = false;

            try
            {
                senhaEhHashValido = BCrypt.Net.BCrypt.Verify(usuario.Senha, usuarioExistente.Senha);
            }
            catch
            {
                // Ignora erro de verificação (ex: senha enviada não era um hash)
            }

            if (!senhaEhHashValido && usuario.Senha != usuarioExistente.Senha)
            {
                usuarioExistente.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
            }
            else if (senhaEhHashValido)
            {
                // já está criptografada, mantém
                usuarioExistente.Senha = usuarioExistente.Senha;
            }
            else
            {
                // caso de fallback
                usuarioExistente.Senha = usuarioExistente.Senha;
            }

            usuarioExistente.PrimeiroNome = usuario.PrimeiroNome;
            usuarioExistente.Sobrenome = usuario.Sobrenome;
            usuarioExistente.Email = usuario.Email;
            usuarioExistente.Ativo = usuario.Ativo;
            usuarioExistente.DataNascimento = usuario.DataNascimento;
            usuarioExistente.Sexo = usuario.Sexo;
            usuarioExistente.Telefone = usuario.Telefone;
            usuarioExistente.Endereco = usuario.Endereco;
            usuarioExistente.IdPerfilUsuario = usuario.IdPerfilUsuario;

            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("deletar/{idUsuario}")]
        public async Task<IActionResult> DeletarUsuario(int idUsuario)
        {
            var usuario = await _context.Usuarios.FindAsync(idUsuario);
            if (usuario == null) return NotFound();
            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch("ativarDesativar/{idUsuario}")]
        public async Task<IActionResult> AtivarDesativarUsuario(int idUsuario, [FromQuery] bool ativo)
        {
            var usuario = await _context.Usuarios.FindAsync(idUsuario);
            if (usuario == null)
                return NotFound("Usuário não encontrado.");

            usuario.Ativo = ativo;
            await _context.SaveChangesAsync();
            return Ok($"Usuário {(ativo ? "ativado" : "desativado")} com sucesso.");
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
        public async Task<IActionResult> InserirPerfil([FromBody] PerfilUsuario perfilUsuario)
        {
            _context.PerfisUsuarios.Add(perfilUsuario);
            await _context.SaveChangesAsync();

            if (perfilUsuario.PerfilPermissoes?.Any() == true)
            {
                var dto = new VinculoPermissaoPerfilDTO
                {
                    IdPerfilUsuario = perfilUsuario.IdPerfilUsuario,
                    IdPermissoes = perfilUsuario.PerfilPermissoes.Select(p => p.IdPermissao).ToList()
                };

                var permissaoController = new PermissaoController(_context);
                await permissaoController.VincularPermissoes(dto);
            }


            return NoContent();
        }

        [HttpGet("{idPerfilUsuario}")]
        public async Task<IActionResult> ObterPerfil(int idPerfilUsuario)
        {
            var perfil = await _context.PerfisUsuarios.FindAsync(idPerfilUsuario);
            if (perfil == null) return NotFound();
            return Ok(perfil);
        }

        [HttpPut("atualizar/{idPerfilUsuario}")]
        public async Task<IActionResult> AtualizarPerfil(int idPerfilUsuario, [FromBody] PerfilUsuario perfilAtualizado)
        {
            if (idPerfilUsuario != perfilAtualizado.IdPerfilUsuario)
                return BadRequest();

            var perfil = await _context.PerfisUsuarios
                .FirstOrDefaultAsync(p => p.IdPerfilUsuario == idPerfilUsuario);

            if (perfil == null) return NotFound();

            perfil.Nome = perfilAtualizado.Nome;
            perfil.Descricao = perfilAtualizado.Descricao;

            _context.Entry(perfil).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            if (perfilAtualizado.PerfilPermissoes?.Any() == true)
            {
                var dto = new VinculoPermissaoPerfilDTO
                {
                    IdPerfilUsuario = perfilAtualizado.IdPerfilUsuario,
                    IdPermissoes = perfilAtualizado.PerfilPermissoes.Select(p => p.IdPermissao).ToList()
                };

                var permissaoController = new PermissaoController(_context);
                await permissaoController.VincularPermissoes(dto);
            }

            return NoContent();

        }

        [HttpDelete("deletar/{idPerfilUsuario}")]
        public async Task<IActionResult> DeletarPerfil(int idPerfilUsuario)
        {
            var perfil = await _context.PerfisUsuarios
         .Include(p => p.PerfilPermissoes)
         .FirstOrDefaultAsync(p => p.IdPerfilUsuario == idPerfilUsuario);

            if (perfil == null)
                return NotFound();

            if (perfil.PerfilPermissoes?.Any() == true)
                _context.PerfilUsuarioPermissoes.RemoveRange(perfil.PerfilPermissoes);

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
        public async Task<IActionResult> InserirPermissao([FromBody] List<Permissao> permissoes)
        {
            if (permissoes == null || !permissoes.Any())
                return BadRequest("Nenhuma permissão enviada.");

            _context.Permissoes.AddRange(permissoes);
            await _context.SaveChangesAsync();

            return Ok(permissoes);
        }

        [HttpGet("{idPermissao}")]
        public async Task<IActionResult> ObterPermissao(int idPermissao)
        {
            var permissao = await _context.Permissoes.FindAsync(idPermissao);
            if (permissao == null) return NotFound();
            return Ok(permissao);
        }

        [HttpPut("atualizar")]
        public async Task<IActionResult> AtualizarPermissoes([FromBody] List<Permissao> permissoes)
        {
            if (permissoes == null || !permissoes.Any())
                return BadRequest("Nenhuma permissão enviada para atualização.");

            foreach (var permissao in permissoes)
            {
                var existente = await _context.Permissoes.FindAsync(permissao.IdPermissao);
                if (existente != null)
                {
                    existente.Nome = permissao.Nome;
                    existente.Descricao = permissao.Descricao;
                    _context.Entry(existente).State = EntityState.Modified;
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("deletar")]
        public async Task<IActionResult> DeletarPermissoes([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Nenhum ID enviado.");

            var permissoes = _context.Permissoes.Where(p => ids.Contains(p.IdPermissao)).ToList();

            if (!permissoes.Any())
                return NotFound("Nenhuma permissão encontrada.");

            _context.Permissoes.RemoveRange(permissoes);
            await _context.SaveChangesAsync();

            return NoContent();
        }
       
        [HttpPost("vincularPerfil")]
        public async Task VincularPermissoes(VinculoPermissaoPerfilDTO dto)
        {
            if (dto == null)
                throw new ArgumentException("Dados inválidos.");

            // Verifica se o perfil existe
            var perfilExiste = await _context.PerfisUsuarios
                .AnyAsync(p => p.IdPerfilUsuario == dto.IdPerfilUsuario);

            if (!perfilExiste)
                throw new ArgumentException("Perfil de usuário inválido.");

            // Pega permissões válidas da base
            var permissoesValidas = await _context.Permissoes
                .Where(p => dto.IdPermissoes.Contains(p.IdPermissao))
                .Select(p => p.IdPermissao)
                .ToListAsync();

            // Permissões já vinculadas
            var vinculadas = await _context.PerfilUsuarioPermissoes
                .Where(p => p.IdPerfilUsuario == dto.IdPerfilUsuario)
                .ToListAsync();

            var atuais = vinculadas.Select(p => p.IdPermissao).ToList();

            // Remove permissões que não estão mais na lista
            var remover = vinculadas.Where(p => !dto.IdPermissoes.Contains(p.IdPermissao)).ToList();
            _context.PerfilUsuarioPermissoes.RemoveRange(remover);

            // Adiciona novas permissões
            var adicionar = permissoesValidas.Except(atuais).Select(id => new PerfilUsuarioPermissao
            {
                IdPerfilUsuario = dto.IdPerfilUsuario,
                IdPermissao = id
            }).ToList();
            _context.PerfilUsuarioPermissoes.AddRange(adicionar);

            await _context.SaveChangesAsync();
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
        public async Task<IActionResult> InserirModalidade([FromBody] Modalidade modalidade)
        {
            _context.Modalidades.Add(modalidade);
            await _context.SaveChangesAsync();
            return Ok(modalidade);
        }

        [HttpGet("{idModalidade}")]
        public async Task<IActionResult> ObterModalidade(int idModalidade)
        {
            var modalidade = await _context.Modalidades.FindAsync(idModalidade);
            if (modalidade == null) return NotFound();
            return Ok(modalidade);
        }

        [HttpPut("atualizar/{idModalidade}")]
        public async Task<IActionResult> AtualizarModalidade(int idModalidade, [FromBody] Modalidade modalidadeAtualizada)
        {
            if (idModalidade != modalidadeAtualizada.IdModalidade) return BadRequest();
            _context.Entry(modalidadeAtualizada).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("deletar/{idModalidade}")]
        public async Task<IActionResult> DeletarModalidade(int idModalidade)
        {
            var modalidade = await _context.Modalidades.FindAsync(idModalidade);
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
        public async Task<IActionResult> InserirInstrutor([FromBody] Instrutor instrutor)
        {
            if (instrutor.Usuario == null)
                return BadRequest("Usuário é obrigatório.");

           
            _context.Usuarios.Add(instrutor.Usuario);
            await _context.SaveChangesAsync();

            instrutor.IdUsuario = instrutor.Usuario.IdUsuario;
            instrutor.Usuario = null;

            _context.Instrutores.Add(instrutor);
            await _context.SaveChangesAsync();
            return Ok(instrutor);
        }

        [HttpGet("{idInstrutor}")]
        public async Task<IActionResult> ObterInstrutor(int idInstrutor)
        {
            var instrutor = await _context.Instrutores.FindAsync(idInstrutor);
            if (instrutor == null) return NotFound();
            return Ok(instrutor);
        }

        [HttpPut("atualizar/{idInstrutor}")]
        public async Task<IActionResult> AtualizarInstrutor(int idInstrutor, [FromBody] Instrutor instrutorAtualizado)
        {
            if (idInstrutor != instrutorAtualizado.IdInstrutor) return BadRequest("ID do instrutor não corresponde.");
           
            var instrutorExistente = await _context.Instrutores
        .Include(a => a.Usuario)
        .FirstOrDefaultAsync(a => a.IdInstrutor == idInstrutor);

            if (instrutorExistente == null)
                return NotFound("Instrutor não encontrado.");

            instrutorExistente.CodigoInstrutor = instrutorAtualizado.CodigoInstrutor;
            instrutorExistente.IdUsuario = instrutorAtualizado.IdUsuario;


            if (instrutorAtualizado.Usuario != null)
            {
                var usuario = instrutorExistente.Usuario;

                usuario.PrimeiroNome = instrutorAtualizado.Usuario.PrimeiroNome ?? usuario.PrimeiroNome;
                usuario.Sobrenome = instrutorAtualizado.Usuario.Sobrenome ?? usuario.Sobrenome;
                usuario.Email = instrutorAtualizado.Usuario.Email ?? usuario.Email;
                usuario.Senha = instrutorAtualizado.Usuario.Senha ?? usuario.Senha;
                usuario.IdPerfilUsuario = instrutorAtualizado.Usuario.IdPerfilUsuario != 0
                    ? instrutorAtualizado.Usuario.IdPerfilUsuario
                    : usuario.IdPerfilUsuario;
                usuario.Sexo = instrutorAtualizado.Usuario.Sexo;
                usuario.Endereco = instrutorAtualizado.Usuario.Endereco ?? usuario.Endereco;
                usuario.Telefone = instrutorAtualizado.Usuario.Telefone ?? usuario.Telefone;
                usuario.DataNascimento = instrutorAtualizado.Usuario.DataNascimento;
            }



            await _context.SaveChangesAsync();
            return Ok("Instrutor atualizado com sucesso.");

        }

        [HttpDelete("deletar/{idInstrutor}")]
        public async Task<IActionResult> DeletarInstrutor(int idInstrutor)
        {
            var instrutor = await _context.Instrutores
         .Include(i => i.Usuario)
         .FirstOrDefaultAsync(i => i.IdInstrutor == idInstrutor);

            if (instrutor == null) return NotFound("Instrutor não encontrado.");

            var usuario = instrutor.Usuario;

            _context.Instrutores.Remove(instrutor);

            if (usuario != null)
                _context.Usuarios.Remove(usuario);

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
        public async Task<IActionResult> InserirMatricula([FromBody] Matricula matricula)
        {
            _context.Matriculas.Add(matricula);
            await _context.SaveChangesAsync();
            return Ok(matricula);
        }

        [HttpGet("{idMatricula}")]
        public async Task<IActionResult> ObterMatricula(int idMatricula)
        {
            var matricula = await _context.Matriculas
         .Include(m => m.Aluno)
             .ThenInclude(a => a.Usuario) 
         .Include(m => m.Turma)
         .FirstOrDefaultAsync(m => m.IdMatricula == idMatricula);

            if (matricula == null) return NotFound();
            return Ok(matricula);
        }
        [HttpPut("atualizar/{idMatricula}")]
        public async Task<IActionResult> AtualizarMatricula(int idMatricula, [FromBody] Matricula matriculaAtualizada)
        {
            if (idMatricula != matriculaAtualizada.IdMatricula)
                return BadRequest("ID da matrícula não confere.");

            var matriculaExistente = await _context.Matriculas.FindAsync(idMatricula);
            if (matriculaExistente == null)
                return NotFound("Matrícula não encontrada.");

            matriculaExistente.IdAluno = matriculaAtualizada.IdAluno;
            matriculaExistente.IdTurma = matriculaAtualizada.IdTurma;
            matriculaExistente.DataMatricula = matriculaAtualizada.DataMatricula;

            await _context.SaveChangesAsync();
            return Ok(matriculaExistente);
        }

        [HttpDelete("deletar/{idMatricula}")]
        public async Task<IActionResult> DeletarMatricula(int idMatricula)
        {
            var matricula = await _context.Matriculas.FindAsync(idMatricula);
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
        public async Task<IActionResult> InserirPresenca([FromBody] Presenca presenca)
        {
            _context.Presencas.Add(presenca);
            await _context.SaveChangesAsync();
            return Ok(presenca);
        }

        [HttpGet("{idPresenca}")]
        public async Task<IActionResult> ObterPresenca(int idPresenca)
        {
            var presenca = await _context.Presencas.FindAsync(idPresenca);
            if (presenca == null) return NotFound();
            return Ok(presenca);
        }

        [HttpDelete("deletar/{idPresenca}")]
        public async Task<IActionResult> DeletarPresenca(int idPresenca)
        {
            var presenca = await _context.Presencas.FindAsync(idPresenca);
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
        public async Task<IActionResult> InserirProgresso([FromBody] Progresso progresso)
        {
            _context.Progressos.Add(progresso);
            await _context.SaveChangesAsync();
            return Ok(progresso);
        }

        [HttpGet("{idProgresso}")]
        public async Task<IActionResult> ObterProgresso(int idProgresso)
        {
            var progresso = await _context.Progressos.FindAsync(idProgresso);
            if (progresso == null) return NotFound();
            return Ok(progresso);
        }

        [HttpDelete("deletar/{idProgresso}")]
        public async Task<IActionResult> DeletarProgresso(int idProgresso)
        {
            var progresso = await _context.Progressos.FindAsync(idProgresso);
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
        public async Task<IActionResult> InserirMensagem([FromBody] MensagemMotivacional mensagem)
        {
            _context.MensagensMotivacionais.Add(mensagem);
            await _context.SaveChangesAsync();
            return Ok(mensagem);
        }

        [HttpGet("{idMensagemMotivacional}")]
        public async Task<IActionResult> ObterMensagem(int idMensagemMotivacional)
        {
            var mensagem = await _context.MensagensMotivacionais.FindAsync(idMensagemMotivacional);
            if (mensagem == null) return NotFound();
            return Ok(mensagem);
        }

        [HttpDelete("deletar/{idMensagemMotivacional}")]
        public async Task<IActionResult> DeletarMensagem(int idMensagemMotivacional)
        {
            var mensagem = await _context.MensagensMotivacionais.FindAsync(idMensagemMotivacional);
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
        public async Task<IActionResult> InserirEnvioMensagem([FromBody] EnvioMensagem envioMensagem)
        {
            _context.EnvioMensagens.Add(envioMensagem);
            await _context.SaveChangesAsync();
            AgendarEnvioMensagem(envioMensagem);
            return Ok(envioMensagem);
        }

        [HttpGet("{idEnvioMensagem}")]
        public async Task<IActionResult> ObterEnvioMensagem(int idEnvioMensagem)
        {
            var envioMensagem = await _context.EnvioMensagens.FindAsync(idEnvioMensagem);
            if (envioMensagem == null) return NotFound();
            return Ok(envioMensagem);
        }

        [HttpDelete("deletar/{idEnvioMensagem}")]
        public async Task<IActionResult> DeletarEnvioMensagem(int idEnvioMensagem)
        {
            var envioMensagem = await _context.EnvioMensagens.FindAsync(idEnvioMensagem);
            if (envioMensagem == null) return NotFound();
            _context.EnvioMensagens.Remove(envioMensagem);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("cancelarEnvio/{idEnvioMensagem}")]
        public async Task<IActionResult> CancelarEnvioMensagem(int idEnvioMensagem)
        {
            var envioMensagem = await _context.EnvioMensagens.FindAsync(idEnvioMensagem);

            if (envioMensagem == null) return NotFound();

            // Marcando como cancelado em vez de excluir
            envioMensagem.Agendado = true;

            _context.EnvioMensagens.Update(envioMensagem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private void AgendarEnvioMensagem([FromBody] EnvioMensagem envioMensagem)
        {

            if (envioMensagem.DataAgendamento > DateTime.Now)
            {
                var tempoDeEspera = envioMensagem.DataAgendamento - DateTime.Now;


                BackgroundJob.Schedule(() => EnviarMensagemWhatsApp(envioMensagem), tempoDeEspera);
            }
            else
            {

                EnviarMensagemWhatsApp(envioMensagem);
            }
        }
        private void EnviarMensagemWhatsApp(EnvioMensagem envioMensagem)
        {
            if (envioMensagem.Agendado)
            {
                return;
            }

            var accountSid = "your_twilio_account_sid";
            var authToken = "your_twilio_auth_token";
            TwilioClient.Init(accountSid, authToken);
            var numeroDestino = envioMensagem.UsuarioAluno.Telefone;
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
