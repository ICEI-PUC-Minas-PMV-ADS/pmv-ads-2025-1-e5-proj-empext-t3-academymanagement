import { IClasseEntity } from '../../domain/entities/IClasseEntity';

export const mockClasses: IClasseEntity[] = [
	{
		id: 'c1',
		name: 'Yoga Basics',
		maximum: 20,
		created_at: '2023-06-01T08:00:00Z',
		updated_at: '2023-06-15T10:00:00Z',
	},
	{
		id: 'c2',
		name: 'Advanced Pilates',
		maximum: 15,
		created_at: '2023-07-10T09:30:00Z',
		updated_at: '2023-07-20T11:45:00Z',
	},
	{
		id: 'c3',
		name: 'Crossfit Challenge',
		maximum: 25,
		created_at: '2023-08-05T07:45:00Z',
		updated_at: '2023-08-25T12:00:00Z',
	},
];
