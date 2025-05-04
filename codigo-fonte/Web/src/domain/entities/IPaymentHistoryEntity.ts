import { ISubscriptionEntity } from './ISubscriptionEntity';

export interface IPaymentHistoryEntity {
	id?: string;
	observation?: string;
	cost?: number;
	subscription_id?: string;
	subscription?: ISubscriptionEntity;
	user_id?: string;
	created_at?: string;
	updated_at?: string;
}
