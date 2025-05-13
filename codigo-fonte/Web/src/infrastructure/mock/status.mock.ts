import {
	IStatusCountEntity,
	IStatusFinancialManagementEntity,
	IStatusStudentAttendanceEntity,
} from '../../domain/entities/IStatusEntity';

export const mockStatusCount: IStatusCountEntity[] = [
	{
		classe: 0,
		frequency: 2,
		subscription: 1,
		user: 1,
	},
];

export const mockStatusStudentAttendance: IStatusStudentAttendanceEntity[] = [
	{
		typeGraphic: 'line',
		categories: ['2025-05-03', '2025-05-05'],
		attendance: {
			title: 'Frequência de Alunos',
			total: 12,
			items: [
				{
					user_name: 'Admin',
					date: '2025-05-03',
				},
				{
					user_name: 'User',
					date: '2025-05-03',
				},
			],
		},
	},
];

export const mockStatusFinancialManagement: IStatusFinancialManagementEntity[] =
	[
		{
			typeGraphic: 'line',
			categories: ['2025-05-03', '2025-05-05'],
			financial: {
				title: 'Frequência de Alunos',
				total: 12,
				items: [
					{
						cost: 25,
						date: '2025-05-03',
					},
					{
						cost: 60,
						date: '2025-05-03',
					},
				],
			},
		},
	];
