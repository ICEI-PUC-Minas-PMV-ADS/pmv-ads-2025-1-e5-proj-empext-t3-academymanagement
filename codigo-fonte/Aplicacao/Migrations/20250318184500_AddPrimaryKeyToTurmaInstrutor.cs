using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Gym.Migrations
{
    /// <inheritdoc />
    public partial class AddPrimaryKeyToTurmaInstrutor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "desenvolvimento");

            migrationBuilder.CreateTable(
                name: "MensagensMotivacionais",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Texto = table.Column<string>(type: "text", nullable: false),
                    HorarioEnvio = table.Column<TimeSpan>(type: "interval", nullable: false),
                    agendado = table.Column<bool>(type: "boolean", nullable: false),
                    data_agendamento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MensagensMotivacionais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Modalidades",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modalidades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PerfisUsuarios",
                schema: "desenvolvimento",
                columns: table => new
                {
                    IdPerfilUsuario = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Descricao = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerfisUsuarios", x => x.IdPerfilUsuario);
                });

            migrationBuilder.CreateTable(
                name: "Permissoes",
                schema: "desenvolvimento",
                columns: table => new
                {
                    IdPermissao = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Descricao = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissoes", x => x.IdPermissao);
                });

            migrationBuilder.CreateTable(
                name: "Turmas",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdModalidade = table.Column<int>(type: "integer", nullable: false),
                    Horario = table.Column<TimeSpan>(type: "interval", nullable: false),
                    Capacidade = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Turmas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Turmas_Modalidades_IdModalidade",
                        column: x => x.IdModalidade,
                        principalSchema: "desenvolvimento",
                        principalTable: "Modalidades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                schema: "desenvolvimento",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PrimeiroNome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Sobrenome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Codigo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Senha = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Ativo = table.Column<bool>(type: "boolean", nullable: false),
                    IdPerfilUsuario = table.Column<int>(type: "integer", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_Usuarios_PerfisUsuarios_IdPerfilUsuario",
                        column: x => x.IdPerfilUsuario,
                        principalSchema: "desenvolvimento",
                        principalTable: "PerfisUsuarios",
                        principalColumn: "IdPerfilUsuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerfilUsuarioPermissao",
                schema: "desenvolvimento",
                columns: table => new
                {
                    idPerfilUsuarioPermissao = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdPerfilUsuario = table.Column<int>(type: "integer", nullable: false),
                    IdPermissao = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerfilUsuarioPermissao", x => x.idPerfilUsuarioPermissao);
                    table.ForeignKey(
                        name: "FK_PerfilUsuarioPermissao_PerfisUsuarios_IdPerfilUsuario",
                        column: x => x.IdPerfilUsuario,
                        principalSchema: "desenvolvimento",
                        principalTable: "PerfisUsuarios",
                        principalColumn: "IdPerfilUsuario",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerfilUsuarioPermissao_Permissoes_IdPermissao",
                        column: x => x.IdPermissao,
                        principalSchema: "desenvolvimento",
                        principalTable: "Permissoes",
                        principalColumn: "IdPermissao",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Alunos",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdUsuario = table.Column<int>(type: "integer", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Sexo = table.Column<int>(type: "integer", nullable: false),
                    Telefone = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    Endereco = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Alunos_Usuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalSchema: "desenvolvimento",
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Instrutores",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdUsuario = table.Column<int>(type: "integer", nullable: false),
                    Telefone = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instrutores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Instrutores_Usuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalSchema: "desenvolvimento",
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnvioMensagens",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdAluno = table.Column<int>(type: "integer", nullable: false),
                    IdMensagem = table.Column<int>(type: "integer", nullable: false),
                    DataEnvio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnvioMensagens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnvioMensagens_Alunos_IdAluno",
                        column: x => x.IdAluno,
                        principalSchema: "desenvolvimento",
                        principalTable: "Alunos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnvioMensagens_MensagensMotivacionais_IdMensagem",
                        column: x => x.IdMensagem,
                        principalSchema: "desenvolvimento",
                        principalTable: "MensagensMotivacionais",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Matriculas",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdAluno = table.Column<int>(type: "integer", nullable: false),
                    IdTurma = table.Column<int>(type: "integer", nullable: false),
                    DataMatricula = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matriculas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matriculas_Alunos_IdAluno",
                        column: x => x.IdAluno,
                        principalSchema: "desenvolvimento",
                        principalTable: "Alunos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Matriculas_Turmas_IdTurma",
                        column: x => x.IdTurma,
                        principalSchema: "desenvolvimento",
                        principalTable: "Turmas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pagamentos",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdAluno = table.Column<int>(type: "integer", nullable: false),
                    DataVencimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataPagamento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Valor = table.Column<decimal>(type: "numeric", nullable: false),
                    Observacao = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pagamentos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pagamentos_Alunos_IdAluno",
                        column: x => x.IdAluno,
                        principalSchema: "desenvolvimento",
                        principalTable: "Alunos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Progressos",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdAluno = table.Column<int>(type: "integer", nullable: false),
                    DataRegistro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Peso = table.Column<decimal>(type: "numeric", nullable: false),
                    cintura = table.Column<decimal>(type: "numeric", nullable: false),
                    quadril = table.Column<decimal>(type: "numeric", nullable: false),
                    gordura_corporal = table.Column<decimal>(type: "numeric", nullable: false),
                    IMC = table.Column<decimal>(type: "numeric", nullable: false),
                    GorduraCorporal = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Progressos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Progressos_Alunos_IdAluno",
                        column: x => x.IdAluno,
                        principalSchema: "desenvolvimento",
                        principalTable: "Alunos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TurmaInstrutor",
                schema: "desenvolvimento",
                columns: table => new
                {
                    IdTurmaInstrutor = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdTurma = table.Column<int>(type: "integer", nullable: false),
                    IdInstrutor = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TurmaInstrutor", x => x.IdTurmaInstrutor);
                    table.ForeignKey(
                        name: "FK_TurmaInstrutor_Instrutores_IdInstrutor",
                        column: x => x.IdInstrutor,
                        principalSchema: "desenvolvimento",
                        principalTable: "Instrutores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TurmaInstrutor_Turmas_IdTurma",
                        column: x => x.IdTurma,
                        principalSchema: "desenvolvimento",
                        principalTable: "Turmas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Presencas",
                schema: "desenvolvimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdMatricula = table.Column<int>(type: "integer", nullable: false),
                    Data = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Presente = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presencas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Presencas_Matriculas_IdMatricula",
                        column: x => x.IdMatricula,
                        principalSchema: "desenvolvimento",
                        principalTable: "Matriculas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alunos_IdUsuario",
                schema: "desenvolvimento",
                table: "Alunos",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_EnvioMensagens_IdAluno",
                schema: "desenvolvimento",
                table: "EnvioMensagens",
                column: "IdAluno");

            migrationBuilder.CreateIndex(
                name: "IX_EnvioMensagens_IdMensagem",
                schema: "desenvolvimento",
                table: "EnvioMensagens",
                column: "IdMensagem");

            migrationBuilder.CreateIndex(
                name: "IX_Instrutores_IdUsuario",
                schema: "desenvolvimento",
                table: "Instrutores",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Matriculas_IdAluno",
                schema: "desenvolvimento",
                table: "Matriculas",
                column: "IdAluno");

            migrationBuilder.CreateIndex(
                name: "IX_Matriculas_IdTurma",
                schema: "desenvolvimento",
                table: "Matriculas",
                column: "IdTurma");

            migrationBuilder.CreateIndex(
                name: "IX_Pagamentos_IdAluno",
                schema: "desenvolvimento",
                table: "Pagamentos",
                column: "IdAluno");

            migrationBuilder.CreateIndex(
                name: "IX_PerfilUsuarioPermissao_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "PerfilUsuarioPermissao",
                column: "IdPerfilUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_PerfilUsuarioPermissao_IdPermissao",
                schema: "desenvolvimento",
                table: "PerfilUsuarioPermissao",
                column: "IdPermissao");

            migrationBuilder.CreateIndex(
                name: "IX_Presencas_IdMatricula",
                schema: "desenvolvimento",
                table: "Presencas",
                column: "IdMatricula");

            migrationBuilder.CreateIndex(
                name: "IX_Progressos_IdAluno",
                schema: "desenvolvimento",
                table: "Progressos",
                column: "IdAluno");

            migrationBuilder.CreateIndex(
                name: "IX_TurmaInstrutor_IdInstrutor",
                schema: "desenvolvimento",
                table: "TurmaInstrutor",
                column: "IdInstrutor");

            migrationBuilder.CreateIndex(
                name: "IX_TurmaInstrutor_IdTurma",
                schema: "desenvolvimento",
                table: "TurmaInstrutor",
                column: "IdTurma");

            migrationBuilder.CreateIndex(
                name: "IX_Turmas_IdModalidade",
                schema: "desenvolvimento",
                table: "Turmas",
                column: "IdModalidade");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                column: "IdPerfilUsuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnvioMensagens",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Pagamentos",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "PerfilUsuarioPermissao",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Presencas",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Progressos",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "TurmaInstrutor",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "MensagensMotivacionais",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Permissoes",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Matriculas",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Instrutores",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Alunos",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Turmas",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Usuarios",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "Modalidades",
                schema: "desenvolvimento");

            migrationBuilder.DropTable(
                name: "PerfisUsuarios",
                schema: "desenvolvimento");
        }
    }
}
