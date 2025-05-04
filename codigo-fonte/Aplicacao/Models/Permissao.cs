using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class Permissao
    {
        [Key]
        public int IdPermissao { get; set; }

        [Required, MaxLength(100)]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        public ICollection<PerfilUsuarioPermissao> PerfilPermissoes { get; set; } = new List<PerfilUsuarioPermissao>();

    }
}
