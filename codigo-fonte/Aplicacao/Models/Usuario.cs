using Gym.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

    [Required, MaxLength(50)]
    public string Codigo { get; set; }

    [Required, MaxLength(255)]
    public string Senha { get; set; }

    public bool Ativo { get; set; }

    public int IdPerfilUsuario { get; set; }
    [ForeignKey("IdPerfilUsuario")]
    public PerfilUsuario PerfilUsuario { get; set; }

    public string Token { get; set; }

}

