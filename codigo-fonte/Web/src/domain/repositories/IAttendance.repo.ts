import { IAttendanceDTO } from '../dtos/IAttendanceSearch.dto';
import { IAttendanceEntity } from '../entities/IAttendanceEntity';

export interface IAttendanceRepository {
  create: (
    data: IAttendanceEntity,
  ) => Promise<Omit<IAttendanceEntity, 'attendance_id'>>;
  getAll: ({
    attendance_id,
    name,
    date,
  }: IAttendanceDTO) => Promise<Omit<IAttendanceEntity, 'attendance_id'>[]>;
  getById: (
    attendanceId: string,
  ) => Promise<Omit<IAttendanceEntity, 'attendance_id'>>;
  update: (
    data: IAttendanceEntity,
  ) => Promise<Omit<IAttendanceEntity, 'attendance_id'>>;
  delete: (attendanceId: string) => Promise<any>;
}
