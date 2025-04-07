import { IUserEntity } from '../../../../domain/entities/IUserEntity';

export interface IAppState {
	user?: IUserLogged;
	loading?: boolean;
	token?: string;
	authenticated?: boolean;
}
