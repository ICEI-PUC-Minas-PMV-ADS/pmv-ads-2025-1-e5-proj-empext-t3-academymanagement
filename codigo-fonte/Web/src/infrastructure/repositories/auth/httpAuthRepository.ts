import { AxiosError } from 'axios';
import { IAuthDTO, IAuthUserRES } from '../../../domain/dtos/IAuth.dto';
import { IAuthRepository } from '../../../domain/repositories/IAuth.repo';
import { apiInstance } from '../../config/apiInstance';



export const httpAuthRepository: IAuthRepository = {
	login: async ({ email, password }: IAuthDTO): Promise<IAuthUserRES> => {
		try {
			const { data } = await apiInstance.post('/Acesso/login', {
				email,
				password,
			});

			return {
				success: true,
				message: 'Login realizado com sucesso.',
				data: {
					user: {
						id: data.id,
						primeiroNome: data.primeiroNome,
						sobrenome: data.sobrenome,
						email: data.email,
						ativo: data.ativo,
						idPerfilUsuario: data.idPerfilUsuario,
						perfilUsuario: data.perfilUsuario,
						token: data.token,
					},
					token: data.token,
				},
			
			
			};
		} catch (error: unknown) {
			const axiosError = error as AxiosError<any>;
			return {
				success: false,
				message:
					axiosError?.response?.data?.mensagem ||
					'Erro ao autenticar o usuário',
			};
		}
	},
};
