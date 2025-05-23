﻿// <auto-generated />
using System;
using Gym.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Gym.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250406135151_AdicionarDataCriacaoUsuario")]
    partial class AdicionarDataCriacaoUsuario
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("desenvolvimento")
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Gym.Models.Aluno", b =>
                {
                    b.Property<int>("IdAluno")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdAluno"));

                    b.Property<int>("IdUsuario")
                        .HasColumnType("integer");

                    b.Property<string>("Matricula")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("IdAluno");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Alunos", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.EnvioMensagem", b =>
                {
                    b.Property<int>("IdEnvioMensagem")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdEnvioMensagem"));

                    b.Property<bool>("Agendado")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("DataAgendamento")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("IdAluno")
                        .HasColumnType("integer");

                    b.Property<int>("IdMensagem")
                        .HasColumnType("integer");

                    b.HasKey("IdEnvioMensagem");

                    b.HasIndex("IdAluno");

                    b.HasIndex("IdMensagem");

                    b.ToTable("EnvioMensagens", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Falta", b =>
                {
                    b.Property<int>("IdFalta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdFalta"));

                    b.Property<DateTime>("DataFalta")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("IdAluno")
                        .HasColumnType("integer");

                    b.Property<int>("IdTurma")
                        .HasColumnType("integer");

                    b.Property<string>("Motivo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("IdFalta");

                    b.HasIndex("IdAluno");

                    b.HasIndex("IdTurma");

                    b.ToTable("Faltas", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Instrutor", b =>
                {
                    b.Property<int>("IdInstrutor")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdInstrutor"));

                    b.Property<string>("CodigoInstrutor")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("integer");

                    b.HasKey("IdInstrutor");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Instrutores", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Matricula", b =>
                {
                    b.Property<int>("IdMatricula")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdMatricula"));

                    b.Property<DateTime>("DataMatricula")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("IdAluno")
                        .HasColumnType("integer");

                    b.Property<int>("IdTurma")
                        .HasColumnType("integer");

                    b.HasKey("IdMatricula");

                    b.HasIndex("IdAluno");

                    b.HasIndex("IdTurma");

                    b.ToTable("Matriculas", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.MensagemMotivacional", b =>
                {
                    b.Property<int>("IdMensagemMotivacional")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdMensagemMotivacional"));

                    b.Property<TimeSpan>("HorarioEnvio")
                        .HasColumnType("interval");

                    b.Property<string>("Texto")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("agendado")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("data_agendamento")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("IdMensagemMotivacional");

                    b.ToTable("MensagensMotivacionais", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Modalidade", b =>
                {
                    b.Property<int>("IdModalidade")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdModalidade"));

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("IdModalidade");

                    b.ToTable("Modalidades", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Pagamento", b =>
                {
                    b.Property<int>("IdPagamento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdPagamento"));

                    b.Property<DateTime?>("DataPagamento")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("DataVencimento")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("IdAluno")
                        .HasColumnType("integer");

                    b.Property<string>("Observacao")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<decimal>("Valor")
                        .HasColumnType("numeric");

                    b.HasKey("IdPagamento");

                    b.HasIndex("IdAluno");

                    b.ToTable("Pagamentos", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.PerfilUsuario", b =>
                {
                    b.Property<int>("IdPerfilUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdPerfilUsuario"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("IdPerfilUsuario");

                    b.ToTable("PerfisUsuarios", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.PerfilUsuarioPermissao", b =>
                {
                    b.Property<int>("idPerfilUsuarioPermissao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("idPerfilUsuarioPermissao"));

                    b.Property<int>("IdPerfilUsuario")
                        .HasColumnType("integer");

                    b.Property<int>("IdPermissao")
                        .HasColumnType("integer");

                    b.HasKey("idPerfilUsuarioPermissao");

                    b.HasIndex("IdPerfilUsuario");

                    b.HasIndex("IdPermissao");

                    b.ToTable("PerfilUsuarioPermissoes", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Permissao", b =>
                {
                    b.Property<int>("IdPermissao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdPermissao"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("IdPermissao");

                    b.ToTable("Permissoes", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Presenca", b =>
                {
                    b.Property<int>("IdPresenca")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdPresenca"));

                    b.Property<DateTime>("Data")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("IdMatricula")
                        .HasColumnType("integer");

                    b.Property<bool>("Presente")
                        .HasColumnType("boolean");

                    b.HasKey("IdPresenca");

                    b.HasIndex("IdMatricula");

                    b.ToTable("Presencas", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Progresso", b =>
                {
                    b.Property<int>("IdProgresso")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdProgresso"));

                    b.Property<DateTime>("DataRegistro")
                        .HasColumnType("timestamp with time zone");

                    b.Property<decimal>("GorduraCorporal")
                        .HasColumnType("numeric");

                    b.Property<decimal>("IMC")
                        .HasColumnType("numeric");

                    b.Property<int>("IdAluno")
                        .HasColumnType("integer");

                    b.Property<decimal>("Peso")
                        .HasColumnType("numeric");

                    b.Property<decimal>("cintura")
                        .HasColumnType("numeric");

                    b.Property<decimal>("gordura_corporal")
                        .HasColumnType("numeric");

                    b.Property<decimal>("quadril")
                        .HasColumnType("numeric");

                    b.HasKey("IdProgresso");

                    b.HasIndex("IdAluno");

                    b.ToTable("Progressos", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Turma", b =>
                {
                    b.Property<int>("IdTurma")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdTurma"));

                    b.Property<int>("Capacidade")
                        .HasColumnType("integer");

                    b.Property<TimeSpan>("Horario")
                        .HasColumnType("interval");

                    b.Property<int>("IdModalidade")
                        .HasColumnType("integer");

                    b.HasKey("IdTurma");

                    b.HasIndex("IdModalidade");

                    b.ToTable("Turmas", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.TurmaInstrutor", b =>
                {
                    b.Property<int>("IdTurmaInstrutor")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdTurmaInstrutor"));

                    b.Property<int>("IdInstrutor")
                        .HasColumnType("integer");

                    b.Property<int>("IdTurma")
                        .HasColumnType("integer");

                    b.HasKey("IdTurmaInstrutor");

                    b.HasIndex("IdInstrutor");

                    b.HasIndex("IdTurma");

                    b.ToTable("TurmaInstrutor", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Usuario", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdUsuario"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("DataNascimento")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<int>("IdPerfilUsuario")
                        .HasColumnType("integer");

                    b.Property<string>("PrimeiroNome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Sexo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Sobrenome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("character varying(15)");

                    b.Property<string>("Token")
                        .HasColumnType("text");

                    b.HasKey("IdUsuario");

                    b.HasIndex("IdPerfilUsuario");

                    b.ToTable("Usuarios", "desenvolvimento");
                });

            modelBuilder.Entity("Gym.Models.Aluno", b =>
                {
                    b.HasOne("Gym.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Gym.Models.EnvioMensagem", b =>
                {
                    b.HasOne("Gym.Models.Usuario", "UsuarioAluno")
                        .WithMany()
                        .HasForeignKey("IdAluno")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gym.Models.MensagemMotivacional", "Mensagem")
                        .WithMany()
                        .HasForeignKey("IdMensagem")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mensagem");

                    b.Navigation("UsuarioAluno");
                });

            modelBuilder.Entity("Gym.Models.Falta", b =>
                {
                    b.HasOne("Gym.Models.Aluno", "Aluno")
                        .WithMany()
                        .HasForeignKey("IdAluno")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gym.Models.Turma", "Turma")
                        .WithMany()
                        .HasForeignKey("IdTurma")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aluno");

                    b.Navigation("Turma");
                });

            modelBuilder.Entity("Gym.Models.Instrutor", b =>
                {
                    b.HasOne("Gym.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Gym.Models.Matricula", b =>
                {
                    b.HasOne("Gym.Models.Aluno", "Aluno")
                        .WithMany()
                        .HasForeignKey("IdAluno")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gym.Models.Turma", "Turma")
                        .WithMany("Matriculas")
                        .HasForeignKey("IdTurma")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aluno");

                    b.Navigation("Turma");
                });

            modelBuilder.Entity("Gym.Models.Pagamento", b =>
                {
                    b.HasOne("Gym.Models.Aluno", "Aluno")
                        .WithMany()
                        .HasForeignKey("IdAluno")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aluno");
                });

            modelBuilder.Entity("Gym.Models.PerfilUsuarioPermissao", b =>
                {
                    b.HasOne("Gym.Models.PerfilUsuario", "PerfilUsuario")
                        .WithMany("PerfilPermissoes")
                        .HasForeignKey("IdPerfilUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gym.Models.Permissao", "Permissao")
                        .WithMany("PerfilPermissoes")
                        .HasForeignKey("IdPermissao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PerfilUsuario");

                    b.Navigation("Permissao");
                });

            modelBuilder.Entity("Gym.Models.Presenca", b =>
                {
                    b.HasOne("Gym.Models.Matricula", "Matricula")
                        .WithMany()
                        .HasForeignKey("IdMatricula")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Matricula");
                });

            modelBuilder.Entity("Gym.Models.Progresso", b =>
                {
                    b.HasOne("Gym.Models.Aluno", "Aluno")
                        .WithMany()
                        .HasForeignKey("IdAluno")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aluno");
                });

            modelBuilder.Entity("Gym.Models.Turma", b =>
                {
                    b.HasOne("Gym.Models.Modalidade", "Modalidade")
                        .WithMany()
                        .HasForeignKey("IdModalidade")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Modalidade");
                });

            modelBuilder.Entity("Gym.Models.TurmaInstrutor", b =>
                {
                    b.HasOne("Gym.Models.Instrutor", "Instrutor")
                        .WithMany()
                        .HasForeignKey("IdInstrutor")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gym.Models.Turma", "Turma")
                        .WithMany("TurmaInstrutores")
                        .HasForeignKey("IdTurma")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Instrutor");

                    b.Navigation("Turma");
                });

            modelBuilder.Entity("Gym.Models.Usuario", b =>
                {
                    b.HasOne("Gym.Models.PerfilUsuario", "PerfilUsuario")
                        .WithMany()
                        .HasForeignKey("IdPerfilUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PerfilUsuario");
                });

            modelBuilder.Entity("Gym.Models.PerfilUsuario", b =>
                {
                    b.Navigation("PerfilPermissoes");
                });

            modelBuilder.Entity("Gym.Models.Permissao", b =>
                {
                    b.Navigation("PerfilPermissoes");
                });

            modelBuilder.Entity("Gym.Models.Turma", b =>
                {
                    b.Navigation("Matriculas");

                    b.Navigation("TurmaInstrutores");
                });
#pragma warning restore 612, 618
        }
    }
}
