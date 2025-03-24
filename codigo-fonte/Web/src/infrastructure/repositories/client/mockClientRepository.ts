import { IClientEntitye } from '../../../domain/entities/IClientEntitye';
import { IClientRepository } from '../../../domain/repositories/IClient.repo';
import { mockClients } from '../../mock/clients.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockClientRepository: IClientRepository = {
	create: async (data: IClientEntitye) => {
		await simulateDelay(500);

		const newClient = {
			...data,
			id: (mockClients.length + 1).toString(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		mockClients.push(newClient);

		return newClient;
	},

	getAll: async ({ user_id }) => {
		await simulateDelay(500);

		return mockClients.filter(
			(client) => !user_id || client.company_id === user_id,
		);
	},

	getById: async (clientId: string) => {
		await simulateDelay(500);

		const client = mockClients.find((client) => client.id === clientId);
		if (!client) throw new Error('Cliente não encontrado');

		return client;
	},

	update: async (data: IClientEntitye) => {
		await simulateDelay(500);

		const index = mockClients.findIndex((client) => client.id === data.id);
		if (index === -1) throw new Error('Cliente não encontrado');

		mockClients[index] = {
			...mockClients[index],
			...data,
			updated_at: new Date().toISOString(),
		};

		return mockClients[index];
	},

	delete: async (clientId: string) => {
		await simulateDelay(500);

		const index = mockClients.findIndex((client) => client.id === clientId);
		if (index === -1) return false;

		mockClients.splice(index, 1);
		return true;
	},
};
