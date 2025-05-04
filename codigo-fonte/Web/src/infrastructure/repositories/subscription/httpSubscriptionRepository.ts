import { ISubscriptionEntity } from '../../../domain/entities/ISubscriptionEntity';
import { ISubscriptionRepository } from '../../../domain/repositories/ISubscription.repo';
import { IResponse } from '../../../types/IResponse';
import { apiInstance } from '../../config/apiInstance';

export const httpSubscriptionRepository: ISubscriptionRepository = {
	create: async (
		data: ISubscriptionEntity,
	): Promise<IResponse<ISubscriptionEntity>> => {
		try {
			const response = await apiInstance.post<
				IResponse<ISubscriptionEntity>
			>('/subscriptions', data);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error creating subscription',
			};
		}
	},

	getAll: async (
		userId?: string,
	): Promise<IResponse<ISubscriptionEntity[]>> => {
		try {
			const url = userId
				? `/subscriptions?userId=${userId}`
				: '/subscriptions';
			const response =
				await apiInstance.get<IResponse<ISubscriptionEntity[]>>(url);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error fetching subscriptions',
				data: [],
			};
		}
	},
	getById: async (
		subscriptionId: string,
	): Promise<IResponse<ISubscriptionEntity>> => {
		try {
			const response = await apiInstance.get<
				IResponse<ISubscriptionEntity>
			>(`/subscriptions/${subscriptionId}`);
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
	getByUserId: async (
		userId: string,
	): Promise<IResponse<ISubscriptionEntity>> => {
		try {
			const response = await apiInstance.get<
				IResponse<ISubscriptionEntity>
			>(`/subscriptions/user/${userId}`);
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
	update: async (data: ISubscriptionEntity): Promise<IResponse<any>> => {
		const { data: response } = await apiInstance.put<
			IResponse<ISubscriptionEntity>
		>(`/subscriptions/${data.id}`, data);
		return response;
	},

	delete: async (subscriptionId: string): Promise<IResponse<any>> => {
		try {
			const response = await apiInstance.delete<IResponse<any>>(
				`/subscriptions/${subscriptionId}`,
			);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error deleting subscription',
			};
		}
	},
};
