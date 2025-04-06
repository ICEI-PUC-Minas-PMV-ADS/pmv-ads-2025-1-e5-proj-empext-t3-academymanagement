using Microsoft.EntityFrameworkCore;
using Gym.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
namespace Gym.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly string _schema;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _schema = configuration.GetSection("DatabaseSettings:Schema").Value ?? "public";
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Falta> Faltas { get; set; }
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Pagamento> Pagamentos { get; set; }
        public DbSet<Turma> Turmas { get; set; }
        public DbSet<TurmaInstrutor> TurmaInstrutor { get; set; }
        public DbSet<Instrutor> Instrutores { get; set; }
        public DbSet<PerfilUsuario> PerfisUsuarios { get; set; }
        public DbSet<Permissao> Permissoes { get; set; }
        public DbSet<MensagemMotivacional> MensagensMotivacionais { get; set; }
        public DbSet<Matricula> Matriculas { get; set; }
        public DbSet<EnvioMensagem> EnvioMensagens { get; set; }
        public DbSet<Modalidade> Modalidades { get; set; }
        public DbSet<Presenca> Presencas { get; set; }
        public DbSet<Progresso> Progressos { get; set; }
        public DbSet<PerfilUsuarioPermissao> PerfilUsuarioPermissoes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema(_schema);
            base.OnModelCreating(modelBuilder);

            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
        v => v.ToUniversalTime(), 
        v => DateTime.SpecifyKind(v, DateTimeKind.Utc) 
    );

         
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var properties = entityType.ClrType.GetProperties()
                    .Where(p => p.PropertyType == typeof(DateTime) || p.PropertyType == typeof(DateTime?));

                foreach (var property in properties)
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property(property.Name)
                        .HasConversion(dateTimeConverter);
                }
            }
            modelBuilder.Entity<PerfilUsuarioPermissao>().ToTable("PerfilUsuarioPermissoes", _schema);

            modelBuilder.Entity<PerfilUsuarioPermissao>()
    .HasKey(p => p.idPerfilUsuarioPermissao);

            modelBuilder.Entity<PerfilUsuarioPermissao>()
                .HasOne(p => p.Permissao)
                .WithMany(p => p.PerfilPermissoes)
                .HasForeignKey(p => p.IdPermissao)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerfilUsuarioPermissao>()
                .HasOne(p => p.PerfilUsuario)
                .WithMany(p => p.PerfilPermissoes)
                .HasForeignKey(p => p.IdPerfilUsuario)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Usuario>()
           .Property(a => a.Sexo)
           .HasConversion<string>();

            modelBuilder.Entity<Pagamento>()
           .Property(a => a.Status)
           .HasConversion<string>();

            modelBuilder.Entity<Instrutor>()
    .HasOne(i => i.Usuario)
    .WithMany()
    .HasForeignKey(i => i.IdUsuario)
    .OnDelete(DeleteBehavior.Cascade);


        }

    }
}