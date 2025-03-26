import { IMeasurementDTO } from '../dtos/IMeasurementSearch.dto';
import { IMeasurementEntity } from '../entities/IMeasurementEntity';

export interface IMeasurementRepository {
  create: (
    data: IMeasurementEntity,
  ) => Promise<Omit<IMeasurementEntity, 'measure_id'>>;
  getAll: ({
    measure_id,
    name,
  }: IMeasurementDTO) => Promise<Omit<IMeasurementEntity, 'measure_id'>[]>;
  getById: (
    measureId: string,
  ) => Promise<Omit<IMeasurementEntity, 'measure_id'>>;
  update: (
    data: IMeasurementEntity,
  ) => Promise<Omit<IMeasurementEntity, 'measure_id'>>;
  delete: (measureId: string) => Promise<any>;
}
