using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class MensagemMotivacional
    {
        [Key]
        public int IdMensagemMotivacional { get; set; }

        [Required]
        public string Texto { get; set; } = string.Empty;

        public TimeSpan HorarioEnvio { get; set; }
        public bool agendado { get; set; }
        public DateTime data_agendamento { get; set; }
    }
}
