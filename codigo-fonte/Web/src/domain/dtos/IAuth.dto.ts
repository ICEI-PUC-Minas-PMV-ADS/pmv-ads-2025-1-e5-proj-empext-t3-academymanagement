import { IUserEntity } from '../entities/IUserEntity';

export type IAuthDTO = Pick<IUserEntity, 'email' | 'password'>;

export type IAuthUserRES = {
	name?: string;
	email?: string;
	accessToken?: string;
};
