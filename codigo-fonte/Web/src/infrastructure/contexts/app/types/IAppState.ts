import { IUserEntity } from '../../../../domain/entities/IUserEntity';

export interface IAppState {
	user?: IUserEntity;
	loading?: boolean;
	token?: string;
	authenticated?: boolean;
}
