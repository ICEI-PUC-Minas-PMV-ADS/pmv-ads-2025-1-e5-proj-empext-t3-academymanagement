import { IClasseEntity } from '../../../domain/entities/IClasseEntity';
import { IClassRepository } from '../../../domain/repositories/IClass.repo';
import { IResponse } from '../../../types/IResponse';
import { apiInstance } from '../../config/apiInstance';

export const httpClassRepository: IClassRepository = {
	create: async (data: IClasseEntity) => {
		const { data: response } = await apiInstance.post<
			IResponse<IClasseEntity>
		>('classe', data);
		return response;
	},

	getAll: async (search?: string) => {
		const { data } =
			await apiInstance.get<IResponse<IClasseEntity[]>>('classe');
		return data;
	},

	getById: async (classId: string) => {
		const { data } = await apiInstance.get<IResponse<IClasseEntity>>(
			`classe/${classId}`,
		);
		return data;
	},

	update: async (data: IClasseEntity) => {
		const { data: response } = await apiInstance.put<
			IResponse<IClasseEntity>
		>(`classe/${data.id}`, data);
		return response;
	},

	delete: async (classId: string) => {
		const { data } = await apiInstance.delete<IResponse<any>>(
			`classe/${classId}`,
		);
		return data;
	},
};
