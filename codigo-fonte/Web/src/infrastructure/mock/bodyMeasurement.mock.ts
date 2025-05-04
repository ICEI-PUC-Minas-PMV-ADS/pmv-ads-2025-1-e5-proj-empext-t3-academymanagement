import { IBodyMeasurementEntity } from '../../domain/entities/IBodyMeasurementEntity';

export const mockBodyMeasurements: IBodyMeasurementEntity[] = [
	{
		id: 'bm1',
		weight: 70,
		waist: 85,
		hip: 95,
		body_fat: 18,
		bmi: 23.5,
		user_id: '401',
		created_at: '2023-06-15T08:30:00Z',
		updated_at: '2023-06-15T08:30:00Z',
	},
	{
		id: 'bm2',
		weight: 65,
		waist: 80,
		hip: 90,
		body_fat: 16,
		bmi: 22.0,
		user_id: '402',
		created_at: '2023-07-15T09:00:00Z',
		updated_at: '2023-07-15T09:00:00Z',
	},
	{
		id: 'bm3',
		weight: 75,
		waist: 88,
		hip: 97,
		body_fat: 20,
		bmi: 24.2,
		user_id: '403',
		created_at: '2023-08-05T10:15:00Z',
		updated_at: '2023-08-05T10:15:00Z',
	},
];
