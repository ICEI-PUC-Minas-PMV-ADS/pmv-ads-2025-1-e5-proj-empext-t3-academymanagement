import { IFrequencyEntity } from '../../../domain/entities/IFrequencyEntity';
import { IFrequencyRepository } from '../../../domain/repositories/IFrequency.repo';
import { IResponse } from '../../../types/IResponse';
import { mockFrequencies } from '../../mock/frequency.mock';

export const mockFrequencyRepository = {
	create: async (data: IFrequencyEntity) => {
		const newFrequency = {
			...data,
			id: crypto.randomUUID(),
			created_at: new Date().toISOString(),
		};
		mockFrequencies.push(newFrequency);

		return {
			success: true,
			message: 'Frequency created successfully',
			data: newFrequency,
		};
	},

	getAll: async (userId?: string) => {
		const filteredFrequencies = userId
			? mockFrequencies.filter((freq) => freq.user_id === userId)
			: mockFrequencies;

		return {
			success: true,
			message: 'Frequencies retrieved successfully',
			data: filteredFrequencies,
		};
	},

	getById: async (frequencyId: string) => {
		const frequency = mockFrequencies.find(
			(freq) => freq.id === frequencyId,
		);

		if (!frequency) {
			return {
				success: false,
				message: 'Frequency not found',
				data: undefined,
			};
		}

		return {
			success: true,
			message: 'Frequency retrieved successfully',
			data: frequency,
		};
	},

	delete: async (frequencyId: string) => {
		const frequencyIndex = mockFrequencies.findIndex(
			(freq) => freq.id === frequencyId,
		);

		if (frequencyIndex === -1) {
			return {
				success: false,
				message: 'Frequency not found',
				data: undefined,
			};
		}

		mockFrequencies.splice(frequencyIndex, 1);

		return {
			success: true,
			message: 'Frequency deleted successfully',
			data: undefined,
		};
	},
};
