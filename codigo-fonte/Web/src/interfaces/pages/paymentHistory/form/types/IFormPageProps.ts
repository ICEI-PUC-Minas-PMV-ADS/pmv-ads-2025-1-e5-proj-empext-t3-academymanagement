import { IPaymentHistoryEntity } from '../../../../../domain/entities/IPaymentHistoryEntity';

export interface IFormPageProps {
	params: {
		paymentHistoryId?: IPaymentHistoryEntity['id'];
	};
}
