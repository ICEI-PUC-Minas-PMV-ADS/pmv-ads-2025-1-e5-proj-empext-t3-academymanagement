import { IStudentDTO } from '../dtos/IStudentSearch.dto';
import { IStudentEntity } from '../entities/IStudentEntity';

export interface IStudentRepository {
  create: (
    data: IStudentEntity,
  ) => Promise<Omit<IStudentEntity, 'student_id'>>;
  getAll: ({
    student_id,
    name,
  }: IStudentDTO) => Promise<Omit<IStudentEntity, 'student_id'>[]>;
  getById: (
    studentId: string,
  ) => Promise<Omit<IStudentEntity, 'student_id'>>;
  update: (
    data: IStudentEntity,
  ) => Promise<Omit<IStudentEntity, 'student_id'>>;
  delete: (studentId: string) => Promise<any>;
}
