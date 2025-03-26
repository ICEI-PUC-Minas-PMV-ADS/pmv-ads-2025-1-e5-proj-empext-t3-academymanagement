import { IEnrollmentDTO } from '../dtos/IEnrollmentSearch.dto';
import { IEnrollmentEntity } from '../entities/IEnrollmentEntity';

export interface IEnrollmentRepository {
  create: (
    data: IEnrollmentEntity,
  ) => Promise<Omit<IEnrollmentEntity, 'enrollment_id'>>;
  getAll: ({
    enrollment_id,
    name,
    student_id,
  }: IEnrollmentDTO) => Promise<Omit<IEnrollmentEntity, 'enrollment_id'>[]>;
  getById: (
    enrollmentId: string,
  ) => Promise<Omit<IEnrollmentEntity, 'enrollment_id'>>;
  update: (
    data: IEnrollmentEntity,
  ) => Promise<Omit<IEnrollmentEntity, 'enrollment_id'>>;
  delete: (enrollmentId: string) => Promise<any>;
}
