import { IBodyMeasurementEntity } from '../../../domain/entities/IBodyMeasurementEntity';
import { IBodyMeasurementRepository } from '../../../domain/repositories/IBodyMeasurement.repo';
import { mockBodyMeasurements } from '../../mock/bodyMeasurement.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockBodyMeasurementRepository: IBodyMeasurementRepository = {
	create: async (data: IBodyMeasurementEntity) => {
		await simulateDelay(500);
		const id = `bm${mockBodyMeasurements.length + 1}`;
		const timestamp = new Date().toISOString();
		const newMeasurement: IBodyMeasurementEntity = {
			...data,
			id,
			created_at: timestamp,
			updated_at: timestamp,
		};
		mockBodyMeasurements.push(newMeasurement);
		return {
			success: true,
			message: 'Medição cadastrada com sucesso',
			data: newMeasurement,
		};
	},

	getAll: async (search?: string) => {
		await simulateDelay(500);
		const data = search
			? mockBodyMeasurements.filter((m) => m.user_id === search)
			: mockBodyMeasurements;
		return {
			success: true,
			message: 'Lista de medições recuperada com sucesso',
			data,
		};
	},

	getById: async (bodyMeasurementId: string) => {
		await simulateDelay(500);
		const found = mockBodyMeasurements.find(
			(m) => m.id === bodyMeasurementId,
		);
		if (!found) {
			return { success: false, message: 'Medição não encontrada.' };
		}
		return {
			success: true,
			message: 'Medição encontrada com sucesso',
			data: found,
		};
	},

	update: async (data: IBodyMeasurementEntity) => {
		await simulateDelay(500);
		const index = mockBodyMeasurements.findIndex((m) => m.id === data.id);
		if (index === -1) {
			return { success: false, message: 'Medição não encontrada.' };
		}
		const updatedMeasurement = {
			...mockBodyMeasurements[index],
			...data,
			updated_at: new Date().toISOString(),
		};
		mockBodyMeasurements[index] = updatedMeasurement;
		return {
			success: true,
			message: 'Medição atualizada com sucesso',
			data: updatedMeasurement,
		};
	},

	delete: async (bodyMeasurementId: string) => {
		await simulateDelay(500);
		const index = mockBodyMeasurements.findIndex(
			(m) => m.id === bodyMeasurementId,
		);
		if (index === -1) {
			return { success: false, message: 'Medição não encontrada.' };
		}
		mockBodyMeasurements.splice(index, 1);
		return {
			success: true,
			message: 'Medição removida com sucesso',
		};
	},
};
