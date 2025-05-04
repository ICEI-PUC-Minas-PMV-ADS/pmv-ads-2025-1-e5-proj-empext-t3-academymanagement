import { useMemo } from 'react';
import { IAuthRepository } from '../../../domain/repositories/IAuth.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { httpAuthRepository } from './httpAuthRepository';
import { mockAuthRepository } from './mockAuthRepository';

export const useAuthRepository = (type?: IRepositorysType): IAuthRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockAuthRepository;
			case 'http':
				return httpAuthRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
