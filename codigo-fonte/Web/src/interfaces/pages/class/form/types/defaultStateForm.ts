import { IClasseEntity } from "../../../../../domain/entities/IClasseEntity";

export type IStateClass = Omit<IClasseEntity, 'created_at' | 'updated_at'>;

export type IStateForm = Omit<IClasseEntity, 'created_at' | 'updated_at'>;
