using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym.Models
{
    public class Falta
    {
        [Key]
        public int IdFalta { get; set; }
        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public Aluno Aluno { get; set; }  

        public int IdTurma { get; set; }
        [ForeignKey("IdTurma")]
        public Turma Turma { get; set; }  

        [Required]
        public DateTime DataFalta { get; set; }

        public string Motivo { get; set; } 
    }
}
