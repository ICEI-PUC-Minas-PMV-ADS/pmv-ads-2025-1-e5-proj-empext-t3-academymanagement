using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Instrutor
    {
        [Key]
        public int IdInstrutor { get; set; }

        [Required, MaxLength(20)]
        public string CodigoInstrutor { get; set; }
        public int IdUsuario { get; set; }

        [ForeignKey("IdUsuario")]
        public Usuario? Usuario { get; set; }


    }
}
