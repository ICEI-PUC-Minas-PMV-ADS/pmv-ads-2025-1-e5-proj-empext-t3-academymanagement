import { IModalityDTO } from '../dtos/IModalitySearch.dto';
import { IModalityEntity } from '../entities/IModalityEntity';

export interface IModalityRepository {
  create: (
    data: IModalityEntity,
  ) => Promise<Omit<IModalityEntity, 'modality_id'>>;
  getAll: ({
    modality_id,
    name,
  }: IModalityDTO) => Promise<Omit<IModalityEntity, 'modality_id'>[]>;
  getById: (
    modalityId: string,
  ) => Promise<Omit<IModalityEntity, 'modality_id'>>;
  update: (
    data: IModalityEntity,
  ) => Promise<Omit<IModalityEntity, 'modality_id'>>;
  delete: (modalityId: string) => Promise<any>;
}
