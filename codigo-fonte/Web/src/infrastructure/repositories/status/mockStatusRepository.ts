import {
	mockStatusCount,
	mockStatusStudentAttendance,
	mockStatusFinancialManagement,
} from '../../mock/status.mock';

export const mockStatusRepository = {
	count: async () => {
		const newStatusCount = {
			id: crypto.randomUUID(),
			created_at: new Date().toISOString(),
			classe: 1,
			frequency: 1,
			subscription: 1,
			user: 1,
		};
		mockStatusCount.push(newStatusCount);

		return {
			success: true,
			message: 'Status count created successfully',
			data: {
				classe: newStatusCount.classe,
				frequency: newStatusCount.frequency,
				subscription: newStatusCount.subscription,
				user: newStatusCount.user,
			},
		};
	},
	studentAttendance: async () => {
		const newStatusStudentAttendance = {
			id: crypto.randomUUID(),
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
		};
		mockStatusStudentAttendance.push(newStatusStudentAttendance);

		return {
			success: true,
			message: 'Status student attendance created successfully',
			data: {
				typeGraphic: newStatusStudentAttendance.typeGraphic,
				categories: newStatusStudentAttendance.categories,
				attendance: newStatusStudentAttendance.attendance,
			},
		};
	},
	financialManagement: async () => {
		const newStatusFinancialManagement = {
			id: crypto.randomUUID(),
			typeGraphic: 'line',
			categories: ['2025-05-03', '2025-05-05'],
			financial: {
				title: 'Frequência de Alunos',
				total: 12,
				items: [
					{
						cost: 80,
						date: '2025-05-03',
					},
					{
						cost: 80,
						date: '2025-05-03',
					},
				],
			},
		};
		mockStatusFinancialManagement.push(newStatusFinancialManagement);

		return {
			success: true,
			message: 'Status financial management created successfully',
			data: {
				typeGraphic: newStatusFinancialManagement.typeGraphic,
				categories: newStatusFinancialManagement.categories,
				financial: newStatusFinancialManagement.financial,
			},
		};
	},
};
