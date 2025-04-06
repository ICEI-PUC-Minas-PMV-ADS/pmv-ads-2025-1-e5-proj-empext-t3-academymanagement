using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Aluno
    {
        [Key]
        public int IdAluno { get; set; }
        [Required, MaxLength(20)]
        public string Matricula { get; set; }
        public int IdUsuario { get; set; }

        [ForeignKey("IdUsuario")]
        public Usuario? Usuario { get; set; }

    }
}
