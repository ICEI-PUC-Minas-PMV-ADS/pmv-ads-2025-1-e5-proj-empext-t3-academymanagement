import { IResponse } from '../../types/IResponse';
import { IBodyMeasurementEntity } from '../entities/IBodyMeasurementEntity';

export interface IBodyMeasurementRepository {
	create: (
		data: IBodyMeasurementEntity,
	) => Promise<IResponse<IBodyMeasurementEntity>>;
	getAll: (search?: string) => Promise<IResponse<IBodyMeasurementEntity[]>>;
	getById: (
		bodyMeasurementId: string,
	) => Promise<IResponse<IBodyMeasurementEntity>>;
	update: (
		data: IBodyMeasurementEntity,
	) => Promise<IResponse<IBodyMeasurementEntity>>;
	delete: (bodyMeasurementId: string) => Promise<IResponse<any>>;
}
