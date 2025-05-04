import { IClassEntity } from '../../../../../domain/entities/IClassEntity';

export interface IFormPageProps {
	params: {
		classId?: IClassEntity['id'];
	};
}
