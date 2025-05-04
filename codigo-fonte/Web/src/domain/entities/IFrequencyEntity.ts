import { IUserEntity } from './IUserEntity';

export interface IFrequencyEntity {
	id?: string;
	user_id?: string;
	user?: IUserEntity;
	created_at?: string;
}
