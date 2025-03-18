using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gym.Migrations
{
    /// <inheritdoc />
    public partial class modificacoes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "desenvolvimento",
                table: "Alunos",
                newName: "IdAluno");

            migrationBuilder.AddColumn<bool>(
                name: "Cancelado",
                schema: "desenvolvimento",
                table: "EnvioMensagens",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cancelado",
                schema: "desenvolvimento",
                table: "EnvioMensagens");

            migrationBuilder.RenameColumn(
                name: "IdAluno",
                schema: "desenvolvimento",
                table: "Alunos",
                newName: "Id");
        }
    }
}
