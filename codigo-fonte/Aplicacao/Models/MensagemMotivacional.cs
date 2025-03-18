using System.ComponentModel.DataAnnotations;

namespace Gym.Models
{
    public class MensagemMotivacional
    {
        [Key]
        public int Id { get; set; }

        public string Texto { get; set; }

        public TimeSpan HorarioEnvio { get; set; }
        public bool agendado { get; set; }
        public DateTime data_agendamento { get; set; }
    }
}
