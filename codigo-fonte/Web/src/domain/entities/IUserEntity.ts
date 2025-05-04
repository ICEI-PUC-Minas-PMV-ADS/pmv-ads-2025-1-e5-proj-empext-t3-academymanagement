import { IBodyMeasurementEntity } from './IBodyMeasurementEntity';
import { IClasseEntity } from './IClasseEntity';
import { ISubscriptionEntity } from './ISubscriptionEntity';

export type UserType = 'STUDENT' | 'ADMIN';

export interface IUserEntity {
	id?: string;
	name?: string;
	email?: string;
	password?: string;
	type?: UserType;
	subscription?: ISubscriptionEntity;
	classes?: {
		user_id?: string;
		classe_id?: string;
		classe: IClasseEntity;
	}[];
	body_measurements?: IBodyMeasurementEntity[];
	created_at?: string;
	updated_at?: string;
}
