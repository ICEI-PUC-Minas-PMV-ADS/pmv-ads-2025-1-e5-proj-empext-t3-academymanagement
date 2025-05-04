import { ISubscriptionEntity } from '../../../../../domain/entities/ISubscriptionEntity';

export interface IFormPageProps {
	params: {
		subscriptionsId?: ISubscriptionEntity['id'];
	};
}
