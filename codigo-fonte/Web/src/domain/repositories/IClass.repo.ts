import { IClassDTO } from '../dtos/IClassSearch.dto';
import { IClassEntity } from '../entities/IClassEntity';

export interface IClassRepository {
  create: (
    data: IClassEntity,
  ) => Promise<Omit<IClassEntity, 'class_id'>>;
  getAll: ({
    class_id,
    name,
    modality_id,
  }: IClassDTO) => Promise<Omit<IClassEntity, 'class_id'>[]>;
  getById: (
    classId: string,
  ) => Promise<Omit<IClassEntity, 'class_id'>>;
  update: (
    data: IClassEntity,
  ) => Promise<Omit<IClassEntity, 'class_id'>>;
  delete: (classId: string) => Promise<any>;
}
