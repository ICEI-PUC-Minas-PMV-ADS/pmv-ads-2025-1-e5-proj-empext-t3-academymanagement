import { IPointEntitye } from '../../../domain/entities/IPointEntitye';
import { IPointRepository } from '../../../domain/repositories/IPoint.repo';
import { mockPoints } from '../../mock/points.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockPointRepository: IPointRepository = {
	create: async (data: IPointEntitye) => {
		await simulateDelay(500);

		const newPoint = {
			...data,
			id: (mockPoints.length + 1).toString(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		mockPoints.push(newPoint);

		return newPoint;
	},

	getAll: async () => {
		await simulateDelay(500);
		return mockPoints;
	},

	getById: async (pointId: string) => {
		await simulateDelay(500);

		const point = mockPoints.find((p) => p.id === pointId);
		if (!point) throw new Error('Ponto não encontrado');

		return point;
	},

	update: async (data: IPointEntitye) => {
		await simulateDelay(500);

		const index = mockPoints.findIndex((p) => p.id === data.id);
		if (index === -1) throw new Error('Ponto não encontrado');

		mockPoints[index] = {
			...mockPoints[index],
			...data,
			updated_at: new Date().toISOString(),
		};

		return mockPoints[index];
	},

	delete: async (pointId: string) => {
		await simulateDelay(500);

		const index = mockPoints.findIndex((p) => p.id === pointId);
		if (index === -1) return false;

		mockPoints.splice(index, 1);
		return true;
	},
};
