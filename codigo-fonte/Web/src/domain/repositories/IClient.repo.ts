import { IGetAllClientsDTO } from '../dtos/IClient.dto';
import { IClientEntitye } from '../entities/IClientEntitye';

export interface IClientRepository {
	create: (data: IClientEntitye) => Promise<IClientEntitye>;
	getAll: ({ user_id }: IGetAllClientsDTO) => Promise<IClientEntitye[]>;
	getById: (clientId: string) => Promise<IClientEntitye>;
	update: (data: IClientEntitye) => Promise<IClientEntitye>;
	delete: (clientId: string) => Promise<any>;
}
