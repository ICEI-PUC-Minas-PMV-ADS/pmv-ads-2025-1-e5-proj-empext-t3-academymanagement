import { IEstablishmentEntitye } from '../../../domain/entities/IEstablishmentEntitye';
import { IEstablishmentRepository } from '../../../domain/repositories/IEstablishment.repo';
import { mockEstablishments } from '../../mock/establishments.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockEstablishmentRepository: IEstablishmentRepository = {
	create: async (data: IEstablishmentEntitye) => {
		await simulateDelay(500);

		const newEstablishment = {
			...data,
			id: (mockEstablishments.length + 1).toString(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		mockEstablishments.push(newEstablishment);

		return newEstablishment;
	},

	getAll: async (name?: string) => {
		await simulateDelay(500);

		if (name) {
			return mockEstablishments.filter((e) =>
				e!.name!.toLowerCase().includes(name.toLowerCase()),
			);
		}

		return mockEstablishments;
	},

	getById: async (establishmentId: string) => {
		await simulateDelay(500);

		const establishment = mockEstablishments.find(
			(e) => e.id === establishmentId,
		);
		if (!establishment) throw new Error('Estabelecimento não encontrado');

		return establishment;
	},

	update: async (data: IEstablishmentEntitye) => {
		await simulateDelay(500);

		const index = mockEstablishments.findIndex((e) => e.id === data.id);
		if (index === -1) throw new Error('Estabelecimento não encontrado');

		mockEstablishments[index] = {
			...mockEstablishments[index],
			...data,
			updated_at: new Date().toISOString(),
		};

		return mockEstablishments[index];
	},

	delete: async (establishmentId: string) => {
		await simulateDelay(500);

		const index = mockEstablishments.findIndex(
			(e) => e.id === establishmentId,
		);
		if (index === -1) return false;

		mockEstablishments.splice(index, 1);
		return true;
	},
};
