import { IUserEntity } from './IUserEntity';
import { IPaymentHistoryEntity } from './IPaymentHistoryEntity';

export interface ISubscriptionEntity {
	id?: string;
	recorrency?: string;
	cost?: number;
	status?: string;
	user_id?: string;
	user?: IUserEntity;
	created_at?: string;
	updated_at?: string;
	payment_History?: IPaymentHistoryEntity[];
}
