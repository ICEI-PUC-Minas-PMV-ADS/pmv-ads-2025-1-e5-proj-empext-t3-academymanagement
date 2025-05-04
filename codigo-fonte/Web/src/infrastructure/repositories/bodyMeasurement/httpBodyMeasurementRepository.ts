import { IBodyMeasurementEntity } from '../../../domain/entities/IBodyMeasurementEntity';
import { IBodyMeasurementRepository } from '../../../domain/repositories/IBodyMeasurement.repo';
import { IResponse } from '../../../types/IResponse';
import { apiInstance } from '../../config/apiInstance';

export const httpBodyMeasurementRepository: IBodyMeasurementRepository = {
	create: async (data: IBodyMeasurementEntity) => {
		const { data: response } = await apiInstance.post<
			IResponse<IBodyMeasurementEntity>
		>('body-measurement', data);
		return response;
	},

	getAll: async (search?: string) => {
		const { data } =
			await apiInstance.get<IResponse<IBodyMeasurementEntity[]>>(
				'body-measurement',
			);
		return data;
	},

	getById: async (bodyMeasurementId: string) => {
		const { data } = await apiInstance.get<
			IResponse<IBodyMeasurementEntity>
		>(`body-measurement/${bodyMeasurementId}`);
		return data;
	},

	update: async (data: IBodyMeasurementEntity) => {
		const { data: response } = await apiInstance.put<
			IResponse<IBodyMeasurementEntity>
		>(`body-measurement/${data.id}`, data);
		return response;
	},

	delete: async (bodyMeasurementId: string) => {
		const { data } = await apiInstance.delete<IResponse<any>>(
			`body-measurement/${bodyMeasurementId}`,
		);
		return data;
	},
};
