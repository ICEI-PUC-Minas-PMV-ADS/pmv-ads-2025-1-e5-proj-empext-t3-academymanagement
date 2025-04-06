using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Instrutor
    {
        [Key]
        public int IdInstrutor { get; set; }

        public int IdUsuario { get; set; }
        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; }

        [MaxLength(15)]
        public string Telefone { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }
    }
}
