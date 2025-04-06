using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Progresso
    {
        [Key]
        public int IdProgresso { get; set; }

        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public Aluno Aluno { get; set; }

        public DateTime DataRegistro { get; set; }

        public decimal Peso { get; set; }
        public decimal cintura { get; set; }
        public decimal quadril { get; set; }
        public decimal gordura_corporal { get; set; }
        public decimal IMC { get; set; }

        public decimal GorduraCorporal { get; set; }
    }
}
