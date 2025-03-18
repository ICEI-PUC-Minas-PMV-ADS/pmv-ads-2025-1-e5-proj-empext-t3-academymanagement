using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym.Models
{
    public class TurmaInstrutor
    {
        [Key]
        public int IdTurmaInstrutor { get; set; }
        public int IdTurma { get; set; }
        [ForeignKey("IdTurma")]
        public Turma Turma { get; set; }

        public int IdInstrutor { get; set; }
        [ForeignKey("IdInstrutor")]
        public Instrutor Instrutor { get; set; }
    }
}
