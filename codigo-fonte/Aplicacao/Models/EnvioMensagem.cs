using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class EnvioMensagem
    {
        [Key]
        public int Id { get; set; }

        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public Aluno Aluno { get; set; }

        public int IdMensagem { get; set; }
        [ForeignKey("IdMensagem")]
        public MensagemMotivacional Mensagem { get; set; }

        public DateTime DataEnvio { get; set; }
        public bool Cancelado { get; set; } = false;
    }
}
