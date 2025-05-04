import { IResponse } from '../../types/IResponse';
import { IClasseEntity } from '../entities/IClasseEntity';

export interface IClassRepository {
	create: (data: IClasseEntity) => Promise<IResponse<IClasseEntity>>;
	getAll: (search?: string) => Promise<IResponse<IClasseEntity[]>>;
	getById: (classId: string) => Promise<IResponse<IClasseEntity>>;
	update: (data: IClasseEntity) => Promise<IResponse<IClasseEntity>>;
	delete: (classId: string) => Promise<IResponse<any>>;
}
