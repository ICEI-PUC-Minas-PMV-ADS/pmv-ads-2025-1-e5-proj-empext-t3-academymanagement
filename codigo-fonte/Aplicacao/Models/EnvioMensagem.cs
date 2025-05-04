using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class EnvioMensagem
    {
        [Key]
        public int IdEnvioMensagem { get; set; }

        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public Usuario? UsuarioAluno { get; set; }

        public int IdMensagem { get; set; }
        [ForeignKey("IdMensagem")]
        public MensagemMotivacional? Mensagem { get; set; }

        public DateTime DataAgendamento { get; set; }
        public bool Agendado { get; set; } 
    }
}
