using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Aluno
    {
        [Key]
        public int IdAluno { get; set; }

        public int IdUsuario { get; set; }
        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; }

        public DateTime DataNascimento { get; set; }

        public SexoEnum Sexo { get; set; }

        [MaxLength(15)]
        public string Telefone { get; set; }

        public string Endereco { get; set; }
    }
}
