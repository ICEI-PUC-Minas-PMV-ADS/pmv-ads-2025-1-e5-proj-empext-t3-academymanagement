import { IResponse } from '../../types/IResponse';
import { IUserEntity } from '../entities/IUserEntity';

export interface IUserRepository {
	create: (
		data: IUserEntity,
	) => Promise<IResponse<Omit<IUserEntity, 'password'>>>;
	getAll: (
		search?: string,
	) => Promise<IResponse<Omit<IUserEntity, 'password'>[]>>;
	getById: (
		userId: string,
	) => Promise<IResponse<Omit<IUserEntity, 'password'>>>;
	update: (
		data: IUserEntity,
	) => Promise<IResponse<Omit<IUserEntity, 'password'>>>;
	delete: (userId: string) => Promise<IResponse<any>>;
}
