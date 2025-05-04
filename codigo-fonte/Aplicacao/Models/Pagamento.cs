using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Pagamento
    {
        [Key]
        public int IdPagamento { get; set; }

        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public Aluno? Aluno { get; set; }

        public DateTime DataVencimento { get; set; }

        public DateTime? DataPagamento { get; set; }

        public decimal Valor { get; set; }
        public string? Observacao { get; set; }

        public StatusPagamento Status { get; set; }
    }
}
