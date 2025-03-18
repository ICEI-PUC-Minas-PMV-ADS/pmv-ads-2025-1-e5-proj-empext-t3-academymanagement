using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Matricula
    {
        [Key]
        public int Id { get; set; }

        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public Aluno Aluno { get; set; }

        public int IdTurma { get; set; }
        [ForeignKey("IdTurma")]
        public Turma Turma { get; set; }

        public DateTime DataMatricula { get; set; }
    }
}
