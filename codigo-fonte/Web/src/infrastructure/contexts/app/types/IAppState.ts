import { ICompanyEntitye } from '../../../../domain/entities/ICompanyEntitye';
import { IEstablishmentEntitye } from '../../../../domain/entities/IEstablishmentEntitye';
import { IUserEntity } from '../../../../domain/entities/IUserEntity';

export type IAccessTypes = 'USER_CREDENTIALS' | 'API_KEY';

export interface IAppState {
	user?: IUserEntity;
	company?: ICompanyEntitye;
	establishment?: IEstablishmentEntitye;
	loading?: boolean;
	token?: string;
	authenticated?: boolean;
}
