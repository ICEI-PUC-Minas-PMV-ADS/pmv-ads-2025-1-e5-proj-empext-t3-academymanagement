import { IUserEntity } from '../../../domain/entities/IUserEntity';
import { IUserRepository } from '../../../domain/repositories/IUser.repo';
import { IResponse } from '../../../types/IResponse';
import { apiInstance } from '../../config/apiInstance';

export const httpUserRepository: IUserRepository = {
	create: async (data: IUserEntity) => {
		const { data: response } = await apiInstance.post<
			IResponse<Omit<IUserEntity, 'password'>>
		>('users', data);
		return response;
	},

	getAll: async (search?: string) => {
		const { data } =
			await apiInstance.get<IResponse<Omit<IUserEntity, 'password'>[]>>(
				'users',
			);
		return data;
	},

	getById: async (userId: string) => {
		const { data } = await apiInstance.get<
			IResponse<Omit<IUserEntity, 'password'>>
		>(`users/${userId}`);
		return data;
	},

	update: async (data: IUserEntity) => {
		const { data: response } = await apiInstance.put<
			IResponse<Omit<IUserEntity, 'password'>>
		>(`users/${data.id}`, data);
		return response;
	},

	delete: async (userId: string) => {
		const { data } = await apiInstance.delete<
			IResponse<Omit<IUserEntity, 'password'>>
		>(`users/${userId}`);
		return data;
	},
};
