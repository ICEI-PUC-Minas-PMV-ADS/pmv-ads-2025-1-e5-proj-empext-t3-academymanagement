import { ICompanyEntitye } from '../../domain/entities/ICompanyEntitye';
import { mockEstablishments } from './establishments.mock';

export const mockCompanies: ICompanyEntitye[] = [
	{
		id: '101',
		name: 'Hotel Bourbon',
		establishments: mockEstablishments,
		created_at: '2023-07-10T09:00:00Z',
		updated_at: '2024-02-01T14:45:00Z',
	},
	{
		id: '102',
		name: 'Green Energy',
		establishments: mockEstablishments,
		created_at: '2023-08-22T11:15:00Z',
		updated_at: '2024-01-20T16:30:00Z',
	},
	{
		id: '103',
		name: 'XPTO Comércio',
		establishments: mockEstablishments,
		created_at: '2023-05-15T08:00:00Z',
		updated_at: '2024-02-18T10:20:00Z',
	},
	{
		id: '104',
		name: 'Blue Ocean Ventures',
		establishments: mockEstablishments,
		created_at: '2023-06-30T10:30:00Z',
		updated_at: '2024-01-10T18:45:00Z',
	},
	{
		id: '105',
		name: 'Future Tech',
		establishments: mockEstablishments,
		created_at: '2023-09-10T14:00:00Z',
		updated_at: '2024-03-08T12:55:00Z',
	},
];
