import { IAuthDTO, IAuthUserRES } from '../../../domain/dtos/IAuth.dto';
import { IAuthRepository } from '../../../domain/repositories/IAuth.repo';
import { mockUsers } from '../../mock/users.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockAuthRepository: IAuthRepository = {
	login: async ({ email, password }: IAuthDTO): Promise<IAuthUserRES> => {
		await simulateDelay(500);

		const user = mockUsers.find(
			(u) => u.email === email && u.password === password
		);

		if (!user) {
			throw new Error('Usuário ou senha inválidos');
		}

		return {
			success: true,
			message: 'Autenticação realizada com sucesso.',
			data: {
				user,
				token: process.env.NEXT_PUBLIC_FIXED_TOKEN || '',
			},
		};
	},
};
