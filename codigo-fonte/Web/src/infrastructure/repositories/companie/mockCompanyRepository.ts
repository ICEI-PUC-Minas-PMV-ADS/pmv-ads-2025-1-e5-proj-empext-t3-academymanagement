import { ICompanyEntitye } from '../../../domain/entities/ICompanyEntitye';
import { ICompanyRepository } from '../../../domain/repositories/ICompany.repo';
import { mockCompanies } from '../../mock/companies.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockCompanyRepository: ICompanyRepository = {
	create: async (data: ICompanyEntitye) => {
		await simulateDelay(500);

		const newCompany = {
			...data,
			id: (mockCompanies.length + 1).toString(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		mockCompanies.push(newCompany);

		return newCompany;
	},

	getAll: async () => {
		await simulateDelay(500);
		return mockCompanies;
	},

	getById: async (companyId: string) => {
		await simulateDelay(500);

		const company = mockCompanies.find(
			(company) => company.id === companyId,
		);
		if (!company) throw new Error('Empresa não encontrada');

		return company;
	},

	update: async (data: ICompanyEntitye) => {
		await simulateDelay(500);

		const index = mockCompanies.findIndex(
			(company) => company.id === data.id,
		);
		if (index === -1) throw new Error('Empresa não encontrada');

		mockCompanies[index] = {
			...mockCompanies[index],
			...data,
			updated_at: new Date().toISOString(),
		};

		return mockCompanies[index];
	},

	delete: async (companyId: string) => {
		await simulateDelay(500);

		const index = mockCompanies.findIndex(
			(company) => company.id === companyId,
		);
		if (index === -1) return false;

		mockCompanies.splice(index, 1);
		return true;
	},
};
