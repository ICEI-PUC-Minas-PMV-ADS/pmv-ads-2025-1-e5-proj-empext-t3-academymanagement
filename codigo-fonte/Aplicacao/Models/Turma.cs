using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Turma
    {
        [Key]
        public int Id { get; set; }

        public int IdModalidade { get; set; }
        [ForeignKey("IdModalidade")]
        public Modalidade Modalidade { get; set; }

        public TimeSpan Horario { get; set; }

        [Range(15, 17)]
        public int Capacidade { get; set; }

        public ICollection<TurmaInstrutor> TurmaInstrutores { get; set; }
        public ICollection<Matricula> Matriculas { get; set; }
    }
}
