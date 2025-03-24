import { IPointEntitye } from '../entities/IPointEntitye';

export interface IPointRepository {
	create: (data: IPointEntitye) => Promise<IPointEntitye>;
	getAll: () => Promise<IPointEntitye[]>;
	getById: (pointId: string) => Promise<IPointEntitye>;
	update: (data: IPointEntitye) => Promise<IPointEntitye>;
	delete: (pointId: string) => Promise<any>;
}
