using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Modalidade
    {
        [Key]
        public int IdModalidade { get; set; }

        [Required, MaxLength(50)]
        public string Nome { get; set; }
    }
}
