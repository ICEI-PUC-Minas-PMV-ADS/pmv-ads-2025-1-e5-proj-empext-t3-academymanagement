import { IResponse } from '../../types/IResponse';
import { IPaymentHistoryEntity } from '../entities/IPaymentHistoryEntity';

export interface IPaymentHistoryRepository {
	create: (
		data: IPaymentHistoryEntity,
	) => Promise<IResponse<IPaymentHistoryEntity>>;
	getAll: (userId?: string) => Promise<IResponse<IPaymentHistoryEntity[]>>;
	getById: (
		paymentHistoryId: string,
	) => Promise<IResponse<IPaymentHistoryEntity>>;
	update: (
		data: IPaymentHistoryEntity,
	) => Promise<IResponse<IPaymentHistoryEntity>>;
	delete: (paymentHistoryId: string) => Promise<IResponse<any>>;
}
