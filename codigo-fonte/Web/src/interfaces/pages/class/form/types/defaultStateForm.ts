import { IClassEntity } from '../../../../../domain/entities/IClassEntity';

export type IStateClass = Omit<IClassEntity, 'created_at' | 'updated_at'>;

export type IStateForm = Omit<IClassEntity, 'created_at' | 'updated_at'>;
