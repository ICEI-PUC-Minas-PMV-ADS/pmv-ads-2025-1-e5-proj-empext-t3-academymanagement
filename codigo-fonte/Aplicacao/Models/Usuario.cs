using Gym.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }

        [Required, MaxLength(100)]
        public string PrimeiroNome { get; set; }

        [Required, MaxLength(100)]
        public string Sobrenome { get; set; }

        [Required, MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public string Senha { get; set; }

        public bool Ativo { get; set; }

        public DateTime DataNascimento { get; set; }

        public SexoEnum Sexo { get; set; }

        [MaxLength(15)]
        public string Telefone { get; set; }

        [MaxLength(255)]
        public string Endereco { get; set; }

        public int IdPerfilUsuario { get; set; }

        [ForeignKey("IdPerfilUsuario")]
        public PerfilUsuario? PerfilUsuario { get; set; }
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
        public string? Token { get; set; }

    }


}