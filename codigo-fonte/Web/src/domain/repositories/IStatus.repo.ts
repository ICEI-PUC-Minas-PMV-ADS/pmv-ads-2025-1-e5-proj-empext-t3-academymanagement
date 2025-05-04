import { IResponse } from '../../types/IResponse';
import { IStatusCountEntity } from '../entities/IStatusEntity';

export interface IStatusRepository {
	count: () => Promise<IResponse<IStatusCountEntity>>;
}
