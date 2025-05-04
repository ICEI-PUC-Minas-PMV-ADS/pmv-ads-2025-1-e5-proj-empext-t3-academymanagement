import { IFrequencyEntity } from '../../../../../domain/entities/IFrequencyEntity';

export interface IFormPageProps {
	params: {
		frequenciesId?: IFrequencyEntity['id'];
	};
}
