using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Presenca
    {
        [Key]
        public int IdPresenca { get; set; }

        public int IdMatricula { get; set; }
        [ForeignKey("IdMatricula")]
        public Matricula? Matricula { get; set; }

        public DateTime Data { get; set; }

        public bool Presente { get; set; }
    }
}
