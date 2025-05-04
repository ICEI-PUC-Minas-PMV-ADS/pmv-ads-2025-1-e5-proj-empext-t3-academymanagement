import { IUserEntity } from './IUserEntity';

export interface IBodyMeasurementEntity {
	id?: string;
	height?: number;
	weight?: number;
	waist?: number;
	hip?: number;
	body_fat?: number;
	bmi?: number;
	user_id?: string;
	user?: IUserEntity;
	created_at?: string;
	updated_at?: string;
}
