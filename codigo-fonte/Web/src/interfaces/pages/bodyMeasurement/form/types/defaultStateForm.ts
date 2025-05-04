import { IBodyMeasurementEntity } from '../../../../../domain/entities/IBodyMeasurementEntity';

export type IStateBodyMeasurement = Omit<
	IBodyMeasurementEntity,
	'created_at' | 'updated_at'
>;

export type IStateForm = Omit<
	IBodyMeasurementEntity,
	'created_at' | 'updated_at'
>;
