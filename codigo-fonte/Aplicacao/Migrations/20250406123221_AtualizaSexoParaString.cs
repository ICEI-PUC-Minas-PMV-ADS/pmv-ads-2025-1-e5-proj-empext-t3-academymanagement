using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gym.Migrations
{
    /// <inheritdoc />
    public partial class AtualizaSexoParaString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_PerfisUsuarios_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Sexo",
                schema: "desenvolvimento",
                table: "Alunos",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                column: "PerfilUsuarioIdPerfilUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_PerfisUsuarios_PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                column: "PerfilUsuarioIdPerfilUsuario",
                principalSchema: "desenvolvimento",
                principalTable: "PerfisUsuarios",
                principalColumn: "IdPerfilUsuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_PerfisUsuarios_PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "PerfilUsuarioIdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios");

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                schema: "desenvolvimento",
                table: "Usuarios",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Sexo",
                schema: "desenvolvimento",
                table: "Alunos",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_IdPerfilUsuario",
                schema: "desenvolvimento",
                table: "Usuarios",
                column: "IdPerfilUsuario");

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
    }
}
