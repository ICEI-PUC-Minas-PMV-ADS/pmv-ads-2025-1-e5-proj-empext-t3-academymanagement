import { IEstablishmentEntitye } from './IEstablishmentEntitye';

export interface ICompanyEntitye {
	id?: string;
	name?: string;
	establishments?: Array<IEstablishmentEntitye>;
	created_at?: string;
	updated_at?: string;
}
