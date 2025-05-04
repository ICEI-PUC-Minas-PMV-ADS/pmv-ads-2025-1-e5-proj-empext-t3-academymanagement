interface IUserLogged {
	
    id: number;
    primeiroNome: string;
    sobrenome: string;
    email: string;
    ativo: boolean;
    idPerfilUsuario: number;
    perfilUsuario: {
        idPerfilUsuario: number;
        nome: string;
        descricao: string;
    };
    token: string;


}
