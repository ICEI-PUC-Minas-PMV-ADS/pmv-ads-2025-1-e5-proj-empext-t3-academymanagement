using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class PerfilUsuario
    {
        [Key]
        public int IdPerfilUsuario { get; set; }

        [Required, MaxLength(100)]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        public ICollection<PerfilUsuarioPermissao> PerfilPermissoes { get; set; }
    }
}
