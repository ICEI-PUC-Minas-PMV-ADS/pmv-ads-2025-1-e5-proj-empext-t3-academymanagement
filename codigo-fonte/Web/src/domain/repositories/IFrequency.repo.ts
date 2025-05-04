import { IResponse } from '../../types/IResponse';
import { IFrequencyEntity } from '../entities/IFrequencyEntity';

export interface IFrequencyRepository {
	create: (data: IFrequencyEntity) => Promise<IResponse<IFrequencyEntity>>;
	getAll: (userId?: string) => Promise<IResponse<IFrequencyEntity[]>>;
	getById: (frequencyId: string) => Promise<IResponse<IFrequencyEntity>>;
	delete: (frequencyId: string) => Promise<IResponse<any>>;
}
