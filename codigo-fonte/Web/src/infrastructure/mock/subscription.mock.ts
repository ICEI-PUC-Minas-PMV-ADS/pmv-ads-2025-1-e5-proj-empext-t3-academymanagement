import { ISubscriptionEntity } from '../../domain/entities/ISubscriptionEntity';
import { IUserEntity } from '../../domain/entities/IUserEntity';
import { IPaymentHistoryEntity } from '../../domain/entities/IPaymentHistoryEntity';

export const mockSubscriptions: ISubscriptionEntity[] = [
	{
		id: 'c1a2b3d4-e5f6-7890-abcd-ef1234567890',
		recorrency: '2025-05-01T00:00:00.000Z',
		cost: 149.99,
		status: 'active',
		user_id: 'u1234567-89ab-cdef-0123-456789abcdef',
		user: {
			id: 'u1234567-89ab-cdef-0123-456789abcdef',
			name: 'Alice Johnson',
			email: 'alice.johnson@example.com',
			password: '$2b$10$abcdefghijk1234567890', // hashed
			created_at: '2024-01-15T08:30:00.000Z',
			updated_at: '2024-03-20T12:45:00.000Z',
		} as IUserEntity,
		created_at: '2024-04-01T09:00:00.000Z',
		updated_at: '2024-04-15T10:15:00.000Z',
		payment_History: [
			{
				id: 'ph9876543-21ba-fedc-0987-654321fedcba',
				observation: 'Primeiro pagamento',
				cost: 149.99,
				subscription_id: 'c1a2b3d4-e5f6-7890-abcd-ef1234567890',
				created_at: '2024-04-01T09:05:00.000Z',
				updated_at: '2024-04-01T09:05:00.000Z',
			},
			{
				id: 'ph1234567-89ab-cdef-0123-456789abcdef',
				observation: 'Pagamento de renovação',
				cost: 149.99,
				subscription_id: 'c1a2b3d4-e5f6-7890-abcd-ef1234567890',
				created_at: '2024-05-01T09:05:00.000Z',
				updated_at: '2024-05-01T09:05:00.000Z',
			},
		] as IPaymentHistoryEntity[],
	},
];
