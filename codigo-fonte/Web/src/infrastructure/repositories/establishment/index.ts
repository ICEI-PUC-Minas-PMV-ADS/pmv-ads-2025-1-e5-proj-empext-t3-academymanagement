import { useMemo } from 'react';
import { IEstablishmentRepository } from '../../../domain/repositories/IEstablishment.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { mockEstablishmentRepository } from './mockEstablishmentRepository';

export const useEstablishmentRepository = (
	type?: IRepositorysType,
): IEstablishmentRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockEstablishmentRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
