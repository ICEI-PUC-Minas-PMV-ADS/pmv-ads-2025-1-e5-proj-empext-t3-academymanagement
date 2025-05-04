import { IPaymentHistoryEntity } from '../../domain/entities/IPaymentHistoryEntity';
import { ISubscriptionEntity } from '../../domain/entities/ISubscriptionEntity';

export const mockPaymentHistories: IPaymentHistoryEntity[] = [
	{
		id: 'ph1a2b3c4-d5e6-7890-abcd-ef1234567890',
		observation: 'Pagamento inicial',
		cost: 199.99,
		subscription_id: 'sub1a2b3c4-d5e6-7890-abcd-ef1234567890',
		subscription: {
			id: 'sub1a2b3c4-d5e6-7890-abcd-ef1234567890',
			recorrency: '2025-06-01T00:00:00.000Z',
			cost: 199.99,
			status: 'active',
			user_id: 'u1a2b3c4-d5e6-7890-abcd-ef1234567890',
			created_at: '2024-05-01T08:00:00.000Z',
			updated_at: '2024-05-01T08:00:00.000Z',
		} as ISubscriptionEntity,
		created_at: '2025-06-01T00:05:00.000Z',
		updated_at: '2025-06-01T00:05:00.000Z',
	},
	{
		id: 'ph5f6e7d8-c9b0-1234-5678-90abcdef1234',
		observation: 'Cobrança de renovação',
		cost: 199.99,
		subscription_id: 'sub5f6e7d8-c9b0-1234-5678-90abcdef1234',
		subscription: {
			id: 'sub5f6e7d8-c9b0-1234-5678-90abcdef1234',
			recorrency: '2025-07-01T00:00:00.000Z',
			cost: 199.99,
			status: 'active',
			user_id: 'u5f6e7d8-c9b0-1234-5678-90abcdef1234',
			created_at: '2024-06-01T08:00:00.000Z',
			updated_at: '2024-06-01T08:00:00.000Z',
		} as ISubscriptionEntity,
		created_at: '2025-07-01T00:05:00.000Z',
		updated_at: '2025-07-01T00:05:00.000Z',
	},
];
