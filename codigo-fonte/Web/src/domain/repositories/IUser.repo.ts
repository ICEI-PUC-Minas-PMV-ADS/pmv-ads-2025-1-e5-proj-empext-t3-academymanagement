import { IGetAllUsersDTO } from '../dtos/IUser.dto';
import { IUserEntity } from '../entities/IUserEntity';

export interface IUserRepository {
	create: (
		data: IUserEntity,
	) => Promise<Omit<IUserEntity, 'company_id' | 'password'>>;
	getAll: ({
		company_id,
		name,
	}: IGetAllUsersDTO) => Promise<
		Omit<IUserEntity, 'company_id' | 'password'>[]
	>;
	getById: (
		userId: string,
	) => Promise<Omit<IUserEntity, 'company_id' | 'password'>>;
	update: (
		data: IUserEntity,
	) => Promise<Omit<IUserEntity, 'company_id' | 'password'>>;
	delete: (userId: string) => Promise<any>;
}
