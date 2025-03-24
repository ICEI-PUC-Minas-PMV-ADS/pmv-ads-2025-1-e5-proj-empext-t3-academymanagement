import { IAuthDTO, IAuthUserRES } from '../dtos/IAuth.dto';

export interface IAuthRepository {
	login: ({ email, password }: IAuthDTO) => Promise<IAuthUserRES>;
}
