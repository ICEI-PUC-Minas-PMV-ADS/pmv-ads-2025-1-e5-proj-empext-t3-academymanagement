import { IResponse } from '../../types/IResponse';
import {
	IBmiProgress,
	IFinancialManagement,
	IStatusCountEntity,
	IStudentAttendance,
} from '../entities/IStatusEntity';

export interface IStatusRepository {
	count: () => Promise<IResponse<IStatusCountEntity>>;
	studentAttendance: () => Promise<IResponse<IStudentAttendance>>;
	financialManagement: () => Promise<IResponse<IFinancialManagement>>;
	bmiProgress: (userId: string) => Promise<IResponse<IBmiProgress>>;
}
