import { IResponse } from '../../types/IResponse';
import { ISubscriptionEntity } from '../entities/ISubscriptionEntity';

export interface ISubscriptionRepository {
	create: (
		data: ISubscriptionEntity,
	) => Promise<IResponse<ISubscriptionEntity>>;
	getAll: (userId?: string) => Promise<IResponse<ISubscriptionEntity[]>>;
	getById: (
		subscriptionId: string,
	) => Promise<IResponse<ISubscriptionEntity>>;
	getByUserId: (userId: string) => Promise<IResponse<ISubscriptionEntity>>;
	update: (
		data: ISubscriptionEntity,
	) => Promise<IResponse<ISubscriptionEntity>>;
	delete: (subscriptionId: string) => Promise<IResponse<any>>;
}
