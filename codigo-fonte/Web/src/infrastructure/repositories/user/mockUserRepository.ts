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
			message: 'Usuário cadastrado com sucesso',
			success: true,
			data: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				created_at: newUser.created_at,
				updated_at: newUser.updated_at,
			},
		};
	},

	getAll: async (search?: string) => {
		await simulateDelay(500);

		const users = mockUsers
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

		return {
			message: 'Lista de usuários recuperada com sucesso',
			success: true,
			data: users,
		};
	},

	getById: async (userId: string) => {
		await simulateDelay(500);

		const user = mockUsers.find((user) => user.id === userId);
		if (!user) {
			return {
				message: 'Usuário não encontrado',
				success: false,
			};
		}

		return {
			message: 'Usuário encontrado com sucesso',
			success: true,
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				created_at: user.created_at,
				updated_at: user.updated_at,
			},
		};
	},

	update: async (data: IUserEntity) => {
		await simulateDelay(500);

		const index = mockUsers.findIndex((user) => user.id === data.id);
		if (index === -1) {
			return {
				message: 'Usuário não encontrado',
				success: false,
			};
		}

		mockUsers[index] = {
			...mockUsers[index],
			...data,
			updated_at: new Date().toISOString(),
		};

		const updatedUser = mockUsers[index];

		return {
			message: 'Usuário atualizado com sucesso',
			success: true,
			data: {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				created_at: updatedUser.created_at,
				updated_at: updatedUser.updated_at,
			},
		};
	},

	delete: async (userId: string) => {
		await simulateDelay(500);

		const index = mockUsers.findIndex((user) => user.id === userId);
		if (index === -1) {
			return {
				message: 'Usuário não encontrado',
				success: false,
			};
		}

		mockUsers.splice(index, 1);

		return {
			data: undefined,
			message: 'Usuário removido com sucesso',
			success: true,
		};
	},
};
