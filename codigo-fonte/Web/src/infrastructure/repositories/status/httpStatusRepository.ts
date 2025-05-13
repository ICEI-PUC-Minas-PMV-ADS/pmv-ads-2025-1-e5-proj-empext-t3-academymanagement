import {
	IStatusBmiProgressEntity,
	IStatusCountEntity,
	IStatusFinancialManagementEntity,
	IStatusStudentAttendanceEntity,
} from '../../../domain/entities/IStatusEntity';
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
	studentAttendance: async (userId?: string ): Promise<
		IResponse<IStatusStudentAttendanceEntity>
	> => {
		try {
			const response = await apiInstance.get<
				IResponse<IStatusStudentAttendanceEntity>
			>(userId && userId !== null ? `/status/student-attendance?user_id=${userId}` : '/status/student-attendance');
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message || 'Error getting status',
			};
		}
	},
	financialManagement: async (): Promise<
		IResponse<IStatusFinancialManagementEntity>
	> => {
		try {
			const response = await apiInstance.get<
				IResponse<IStatusFinancialManagementEntity>
			>('/status/Financial-management');
			return response.data;
		} catch (error: any) {
			return {
				success: false,
				message:
					error.response?.data?.message || 'Error getting status',
			};
		}
	},
	bmiProgress: async (
		userId: string,
	): Promise<IResponse<IStatusBmiProgressEntity>> => {
		try {
			const response = await apiInstance.get<
				IResponse<IStatusBmiProgressEntity>
			>(`/status/bmi-progress?user_id=${userId}`);
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
