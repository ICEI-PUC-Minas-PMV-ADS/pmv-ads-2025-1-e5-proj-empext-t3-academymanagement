import { ICompanyEntitye } from '../entities/ICompanyEntitye';

export interface ICompanyRepository {
	create: (data: ICompanyEntitye) => Promise<ICompanyEntitye>;
	getAll: () => Promise<ICompanyEntitye[]>;
	getById: (companyId: string) => Promise<ICompanyEntitye>;
	update: (data: ICompanyEntitye) => Promise<ICompanyEntitye>;
	delete: (companyId: string) => Promise<any>;
}
