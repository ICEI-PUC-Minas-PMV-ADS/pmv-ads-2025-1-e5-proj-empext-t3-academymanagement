import { IUserEntity } from '../../../../../domain/entities/IUserEntity';

export interface IFormPageProps {
	params: {
		userId?: IUserEntity['id'];
	};
}
