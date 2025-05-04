using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gym.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarDataCriacaoUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EnvioMensagens_Alunos_IdAluno",
                schema: "desenvolvimento",
                table: "EnvioMensagens");

            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_PerfisUsuarios_PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "Codigo",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "Telefone",
                schema: "desenvolvimento",
                table: "Instrutores");

            migrationBuilder.DropColumn(
                name: "DataNascimento",
                schema: "desenvolvimento",
                table: "Alunos");

            migrationBuilder.DropColumn(
                name: "Endereco",
                schema: "desenvolvimento",
                table: "Alunos");

            migrationBuilder.DropColumn(
                name: "Sexo",
                schema: "desenvolvimento",
                table: "Alunos");

            migrationBuilder.DropColumn(
                name: "Telefone",
                schema: "desenvolvimento",
                table: "Alunos");

            migrationBuilder.AlterColumn<string>(
                name: "Senha",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataNascimento",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Endereco",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Sexo",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "character varying(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CodigoInstrutor",
                schema: "desenvolvimento",
                table: "Instrutores",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Matricula",
                schema: "desenvolvimento",
                table: "Alunos",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                column: "IdPerfilUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_EnvioMensagens_Usuarios_IdAluno",
                schema: "desenvolvimento",
                table: "EnvioMensagens",
                column: "IdAluno",
                principalSchema: "desenvolvimento",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_PerfisUsuarios_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                column: "IdPerfilUsuario",
                principalSchema: "desenvolvimento",
                principalTable: "PerfisUsuarios",
                principalColumn: "IdPerfilUsuario",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EnvioMensagens_Usuarios_IdAluno",
                schema: "desenvolvimento",
                table: "EnvioMensagens");

            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_PerfisUsuarios_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "DataNascimento",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "Endereco",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "Sexo",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "Telefone",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "CodigoInstrutor",
                schema: "desenvolvimento",
                table: "Instrutores");

            migrationBuilder.DropColumn(
                name: "Matricula",
                schema: "desenvolvimento",
                table: "Alunos");

            migrationBuilder.AlterColumn<string>(
                name: "Senha",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "Codigo",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                schema: "desenvolvimento",
                table: "Instrutores",
                type: "character varying(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataNascimento",
                schema: "desenvolvimento",
                table: "Alunos",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Endereco",
                schema: "desenvolvimento",
                table: "Alunos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Sexo",
                schema: "desenvolvimento",
                table: "Alunos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                schema: "desenvolvimento",
                table: "Alunos",
                type: "character varying(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                column: "PerfilUsuarioIdPerfilUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_EnvioMensagens_Alunos_IdAluno",
                schema: "desenvolvimento",
                table: "EnvioMensagens",
                column: "IdAluno",
                principalSchema: "desenvolvimento",
                principalTable: "Alunos",
                principalColumn: "IdAluno",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_PerfisUsuarios_PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                column: "PerfilUsuarioIdPerfilUsuario",
                principalSchema: "desenvolvimento",
                principalTable: "PerfisUsuarios",
                principalColumn: "IdPerfilUsuario");
        }
    }
}
