using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym.Models
{
    public class PerfilUsuarioPermissao
    {
        [Key]
        public int idPerfilUsuarioPermissao { get; set; }
        public int IdPerfilUsuario { get; set; }
        [ForeignKey("IdPerfilUsuario")]
        public PerfilUsuario PerfilUsuario { get; set; }

        public int IdPermissao { get; set; }
        [ForeignKey("IdPermissao")]
        public Permissao Permissao { get; set; }
    }
}
