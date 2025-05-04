import { IStatusCountEntity } from '../../../domain/entities/IStatusEntity';
import { IStatusRepository } from '../../../domain/repositories/IStatus.repo';
import { IResponse } from '../../../types/IResponse';
import { mockStatusCount } from '../../mock/status.mock';
import { simulateDelay } from '../../utils/simulateDelay';

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
};
