import { IPaymentHistoryEntity } from '../../../domain/entities/IPaymentHistoryEntity';
import { IPaymentHistoryRepository } from '../../../domain/repositories/IPaymentHistory.repo';
import { IResponse } from '../../../types/IResponse';
import { apiInstance } from '../../config/apiInstance';

export const httpPaymentHistoryRepository: IPaymentHistoryRepository = {
	create: async (
		data: IPaymentHistoryEntity,
	): Promise<IResponse<IPaymentHistoryEntity>> => {
		try {
			const response = await apiInstance.post<
				IResponse<IPaymentHistoryEntity>
			>('/payment-histories', data);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error creating payment history',
			};
		}
	},

	getAll: async (
		userId?: string,
	): Promise<IResponse<IPaymentHistoryEntity[]>> => {
		try {
			const url = userId
				? `/payment-histories?userId=${userId}`
				: '/payment-histories';
			const response =
				await apiInstance.get<IResponse<IPaymentHistoryEntity[]>>(url);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error fetching payment history',
				data: [],
			};
		}
	},
	getById: async (
		paymentHistoryId: string,
	): Promise<IResponse<IPaymentHistoryEntity>> => {
		try {
			const response = await apiInstance.get<
				IResponse<IPaymentHistoryEntity>
			>(`/payment-histories/${paymentHistoryId}`);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error fetching subscription',
			};
		}
	},

	update: async (
		data: IPaymentHistoryEntity,
	): Promise<IResponse<IPaymentHistoryEntity>> => {
		try {
			const response = await apiInstance.put<
				IResponse<IPaymentHistoryEntity>
			>(`/payment-histories/${data.id}`, data);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error updating payment history',
			};
		}
	},

	delete: async (paymentHistoryId: string): Promise<IResponse<any>> => {
		try {
			const response = await apiInstance.delete<IResponse<any>>(
				`/payment-histories/${paymentHistoryId}`,
			);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error deleting payment history',
			};
		}
	},
};
