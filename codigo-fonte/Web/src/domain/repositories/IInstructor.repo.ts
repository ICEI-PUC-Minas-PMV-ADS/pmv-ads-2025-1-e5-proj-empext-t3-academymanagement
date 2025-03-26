import { IInstructorDTO } from '../dtos/IInstructorSearch.dto';
import { IInstructorEntity } from '../entities/IInstructorEntity';

export interface IInstructorRepository {
  create: (
    data: IInstructorEntity,
  ) => Promise<Omit<IInstructorEntity, 'instructor_id'>>;
  getAll: ({
    instructor_id,
    name,
  }: IInstructorDTO) => Promise<Omit<IInstructorEntity, 'instructor_id'>[]>;
  getById: (
    instructorId: string,
  ) => Promise<Omit<IInstructorEntity, 'instructor_id'>>;
  update: (
    data: IInstructorEntity,
  ) => Promise<Omit<IInstructorEntity, 'instructor_id'>>;
  delete: (instructorId: string) => Promise<any>;
}
