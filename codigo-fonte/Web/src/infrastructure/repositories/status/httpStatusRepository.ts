import { IStatusCountEntity } from '../../../domain/entities/IStatusEntity';
import { IStatusRepository } from '../../../domain/repositories/IStatus.repo';
import { IResponse } from '../../../types/IResponse';
import { apiInstance } from '../../config/apiInstance';

export const httpStatusRepository: IStatusRepository = {
	count: async (): Promise<IResponse<IStatusCountEntity>> => {
		try {
			const response =
				await apiInstance.get<IResponse<IStatusCountEntity>>(
					'/status/count',
				);
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message || 'Error getting status',
			};
		}
	},
};
