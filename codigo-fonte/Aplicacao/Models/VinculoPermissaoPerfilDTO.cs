namespace Gym.Models
{
    public class VinculoPermissaoPerfilDTO
    {
        public int IdPerfilUsuario { get; set; }
        public List<int> IdPermissoes { get; set; } = new();
    }
}
