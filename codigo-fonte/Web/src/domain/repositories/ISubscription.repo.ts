import { ISubscriptionDTO } from '../dtos/ISubscriptionSearch.dto';
import { ISubscriptionEntity } from '../entities/ISubscriptionEntity';

export interface ISubscriptionRepository {
  create: (
    data: ISubscriptionEntity,
  ) => Promise<Omit<ISubscriptionEntity, 'subscription_id'>>;
  getAll: ({
    subscription_id,
    name,
  }: ISubscriptionDTO) => Promise<Omit<ISubscriptionEntity, 'subscription_id'>[]>;
  getById: (
    subscriptionId: string,
  ) => Promise<Omit<ISubscriptionEntity, 'subscription_id'>>;
  update: (
    data: ISubscriptionEntity,
  ) => Promise<Omit<ISubscriptionEntity, 'subscription_id'>>;
  delete: (subscriptionId: string) => Promise<any>;
}
