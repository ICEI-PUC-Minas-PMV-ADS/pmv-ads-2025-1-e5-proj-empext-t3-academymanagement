import { IFrequencyEntity } from '../../../domain/entities/IFrequencyEntity';
import { IFrequencyRepository } from '../../../domain/repositories/IFrequency.repo';
import { IResponse } from '../../../types/IResponse';
import { apiInstance } from '../../config/apiInstance';

export const httpFrequencyRepository: IFrequencyRepository = {
	create: async (
		data: IFrequencyEntity,
	): Promise<IResponse<IFrequencyEntity>> => {
		try {
			const response = await apiInstance.post<
				IResponse<IFrequencyEntity>
			>('/frequencies', data);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message || 'Error creating frequency',
			};
		}
	},

	getAll: async (userId?: string): Promise<IResponse<IFrequencyEntity[]>> => {
		try {
			const url = userId
				? `/frequencies?userId=${userId}`
				: '/frequencies';
			const response =
				await apiInstance.get<IResponse<IFrequencyEntity[]>>(url);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'Error fetching frequencies',
				data: [],
			};
		}
	},
	getById: async (
		frequencyId: string,
	): Promise<IResponse<IFrequencyEntity>> => {
		try {
			const response = await apiInstance.get<IResponse<IFrequencyEntity>>(
				`/frequencies/${frequencyId}`,
			);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message || 'Error fetching frequency',
			};
		}
	},
	delete: async (frequencyId: string): Promise<IResponse<any>> => {
		try {
			const response = await apiInstance.delete<IResponse<any>>(
				`/frequencies/${frequencyId}`,
			);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message || 'Error deleting frequency',
			};
		}
	},
};
