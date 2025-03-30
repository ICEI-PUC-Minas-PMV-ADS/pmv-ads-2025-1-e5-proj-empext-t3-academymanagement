import { IUserEntity } from '../entities/IUserEntity';

export interface IUserRepository {
	create: (data: IUserEntity) => Promise<Omit<IUserEntity, 'password'>>;
	getAll: (search?: string) => Promise<Omit<IUserEntity, 'password'>[]>;
	getById: (userId: string) => Promise<Omit<IUserEntity, 'password'>>;
	update: (data: IUserEntity) => Promise<Omit<IUserEntity, 'password'>>;
	delete: (userId: string) => Promise<any>;
}
