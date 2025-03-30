import { useMemo } from 'react';
import { IUserRepository } from '../../../domain/repositories/IUser.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { httpUserRepository } from './httpUserRepository';
import { mockUserRepository } from './mockUserRepository';

export const useUserRepository = (type?: IRepositorysType): IUserRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockUserRepository;
			case 'http':
				return httpUserRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
