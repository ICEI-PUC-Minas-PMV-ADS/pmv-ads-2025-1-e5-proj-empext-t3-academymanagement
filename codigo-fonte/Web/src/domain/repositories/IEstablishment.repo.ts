import { IEstablishmentEntitye } from '../entities/IEstablishmentEntitye';

export interface IEstablishmentRepository {
	create: (data: IEstablishmentEntitye) => Promise<IEstablishmentEntitye>;
	getAll: (name?: string) => Promise<IEstablishmentEntitye[]>;
	getById: (establishmentId: string) => Promise<IEstablishmentEntitye>;
	update: (data: IEstablishmentEntitye) => Promise<IEstablishmentEntitye>;
	delete: (establishmentId: string) => Promise<any>;
}
