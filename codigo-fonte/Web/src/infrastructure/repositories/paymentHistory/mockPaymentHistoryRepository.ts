import { IPaymentHistoryEntity } from '../../../domain/entities/IPaymentHistoryEntity';
import { IResponse } from '../../../types/IResponse';
import { mockPaymentHistories } from '../../mock/paymentHistory.mock';

export const mockPaymentHistoryRepository = {
	create: async (data: IPaymentHistoryEntity) => {
		const newPaymentHistory = {
			...data,
			id: crypto.randomUUID(),
			created_at: new Date().toISOString(),
		};
		mockPaymentHistories.push(newPaymentHistory);

		return {
			success: true,
			message: 'Payment history created successfully',
			data: newPaymentHistory,
		};
	},

	getAll: async (userId?: string) => {
		const filteredPaymentHistories = userId
			? mockPaymentHistories.filter((ph) => ph.user_id === userId)
			: mockPaymentHistories;

		return {
			success: true,
			message: 'Payment history retrieved successfully',
			data: filteredPaymentHistories,
		};
	},

	getById: async (paymentHistoryId: string) => {
		const paymentHistory = mockPaymentHistories.find(
			(ph) => ph.id === paymentHistoryId,
		);

		if (!paymentHistory) {
			return {
				success: false,
				message: 'Payment history not found',
				data: undefined,
			};
		}

		return {
			success: true,
			message: 'Payment history retrieved successfully',
			data: paymentHistory,
		};
	},

	delete: async (paymentHistoryId: string) => {
		const paymentHistoryIndex = mockPaymentHistories.findIndex(
			(ph) => ph.id === paymentHistoryId,
		);

		if (paymentHistoryIndex === -1) {
			return {
				success: false,
				message: 'Payment history not found',
				data: undefined,
			};
		}

		mockPaymentHistories.splice(paymentHistoryIndex, 1);

		return {
			success: true,
			message: 'Payment history deleted successfully',
			data: undefined,
		};
	},
};
