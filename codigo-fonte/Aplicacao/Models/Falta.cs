using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym.Models
{
    public class Falta
    {
        [Key]
        public int IdFalta { get; set; }

        [ForeignKey("Aluno")]
        public int IdAluno { get; set; }
        public Aluno Aluno { get; set; }  

        [ForeignKey("Turma")]
        public int IdTurma { get; set; }
        public Turma Turma { get; set; }  

        [Required]
        public DateTime DataFalta { get; set; }

        public string Motivo { get; set; } 
    }
}
