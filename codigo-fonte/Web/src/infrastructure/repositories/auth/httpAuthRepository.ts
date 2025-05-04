import { IAuthDTO, IAuthUserRES } from '../../../domain/dtos/IAuth.dto';
import { IAuthRepository } from '../../../domain/repositories/IAuth.repo';
import { apiInstance } from '../../config/apiInstance';

export const httpAuthRepository: IAuthRepository = {
	login: async ({ email, password }: IAuthDTO): Promise<IAuthUserRES> => {
		const { data } = await apiInstance.post<IAuthUserRES>('/auth/login', {
			email,
			password,
		});

		return data;
	},
};
