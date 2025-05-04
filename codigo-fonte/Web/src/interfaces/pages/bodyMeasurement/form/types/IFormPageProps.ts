import { IBodyMeasurementEntity } from '../../../../../domain/entities/IBodyMeasurementEntity';

export interface IFormPageProps {
	params: {
		bodyMeasurementId?: IBodyMeasurementEntity['id'];
	};
}
