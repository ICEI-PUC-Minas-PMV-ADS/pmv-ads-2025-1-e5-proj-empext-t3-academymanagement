import { useMemo } from 'react';
import { ICompanyRepository } from '../../../domain/repositories/ICompany.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { mockCompanyRepository } from './mockCompanyRepository';

export const useCompanyRepository = (
	type?: IRepositorysType,
): ICompanyRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockCompanyRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
