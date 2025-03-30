import { IUserEntity } from '../../../../../domain/entities/IUserEntity';

export type IStateUser = Omit<IUserEntity, 'created_at' | 'updated_at'>;

export type IStateForm = Omit<IUserEntity, 'created_at' | 'updated_at'>;
