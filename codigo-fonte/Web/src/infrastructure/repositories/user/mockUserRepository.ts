import { IUserEntity } from '../../../domain/entities/IUserEntity';
import { IUserRepository } from '../../../domain/repositories/IUser.repo';
import { mockUsers } from '../../mock/users.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockUserRepository: IUserRepository = {
	create: async (data: IUserEntity) => {
		await simulateDelay(500);

		const newUser = {
			...data,
			id: (mockUsers.length + 1).toString(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		mockUsers.push(newUser);

		return {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			created_at: newUser.created_at,
			updated_at: newUser.updated_at,
		};
	},

	getAll: async (search?: string) => {
		await simulateDelay(500);

		return mockUsers
			.filter(
				(user) =>
					!search ||
					(user.name &&
						user.name.toLowerCase().includes(search.toLowerCase())),
			)
			.map(({ id, name, email, created_at, updated_at }) => ({
				id,
				name,
				email,
				created_at,
				updated_at,
			}));
	},

	getById: async (userId: string) => {
		await simulateDelay(500);

		const user = mockUsers.find((user) => user.id === userId);
		if (!user) throw new Error('Usuário não encontrado');

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};
	},

	update: async (data: IUserEntity) => {
		await simulateDelay(500);

		const index = mockUsers.findIndex((user) => user.id === data.id);
		if (index === -1) throw new Error('Usuário não encontrado');

		mockUsers[index] = {
			...mockUsers[index],
			...data,
			updated_at: new Date().toISOString(),
		};

		return {
			id: mockUsers[index].id,
			name: mockUsers[index].name,
			email: mockUsers[index].email,
			created_at: mockUsers[index].created_at,
			updated_at: mockUsers[index].updated_at,
		};
	},

	delete: async (userId: string) => {
		await simulateDelay(500);

		const index = mockUsers.findIndex((user) => user.id === userId);
		if (index === -1) return false;

		mockUsers.splice(index, 1);
		return true;
	},
};
