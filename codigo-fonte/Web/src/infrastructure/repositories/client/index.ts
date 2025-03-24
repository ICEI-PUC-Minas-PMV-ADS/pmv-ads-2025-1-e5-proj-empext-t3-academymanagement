import { useMemo } from 'react';
import { IClientRepository } from '../../../domain/repositories/IClient.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { mockClientRepository } from './mockClientRepository';

export const useClientRepository = (
	type?: IRepositorysType,
): IClientRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockClientRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
