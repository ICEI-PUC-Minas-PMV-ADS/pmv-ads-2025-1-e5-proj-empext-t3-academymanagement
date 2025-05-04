import { IClasseEntity } from '../../../domain/entities/IClasseEntity';
import { IClassRepository } from '../../../domain/repositories/IClass.repo';
import { mockClasses } from '../../mock/class.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockClassRepository: IClassRepository = {
	create: async (data: IClasseEntity) => {
		await simulateDelay(500);
		const id = `c${mockClasses.length + 1}`;
		const timestamp = new Date().toISOString();
		const newClass: IClasseEntity = {
			...data,
			id,
			created_at: timestamp,
			updated_at: timestamp,
		};
		mockClasses.push(newClass);
		return {
			success: true,
			message: 'Classe cadastrada com sucesso',
			data: newClass,
		};
	},

	getAll: async (search?: string) => {
		await simulateDelay(500);
		const filtered = mockClasses.filter(
			(c) =>
				!search ||
				(c.name && c.name.toLowerCase().includes(search.toLowerCase())),
		);
		return {
			success: true,
			message: 'Lista de classes recuperada com sucesso',
			data: filtered,
		};
	},

	getById: async (classId: string) => {
		await simulateDelay(500);
		const found = mockClasses.find((c) => c.id === classId);
		if (!found) {
			return { success: false, message: 'Classe não encontrada.' };
		}
		return {
			success: true,
			message: 'Classe encontrada com sucesso',
			data: found,
		};
	},

	update: async (data: IClasseEntity) => {
		await simulateDelay(500);
		const index = mockClasses.findIndex((c) => c.id === data.id);
		if (index === -1) {
			return { success: false, message: 'Classe não encontrada.' };
		}
		const updatedClass = {
			...mockClasses[index],
			...data,
			updated_at: new Date().toISOString(),
		};
		mockClasses[index] = updatedClass;
		return {
			success: true,
			message: 'Classe atualizada com sucesso',
			data: updatedClass,
		};
	},

	delete: async (classId: string) => {
		await simulateDelay(500);
		const index = mockClasses.findIndex((c) => c.id === classId);
		if (index === -1) {
			return { success: false, message: 'Classe não encontrada.' };
		}
		mockClasses.splice(index, 1);
		return {
			success: true,
			message: 'Classe removida com sucesso',
		};
	},
};
