import { useMemo } from 'react';
import { IClassRepository } from '../../../domain/repositories/IClass.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { httpClassRepository } from './httpClassRepository';
import { mockClassRepository } from './mockClassRepository';

export const useClassRepository = (
	type?: IRepositorysType,
): IClassRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockClassRepository;
			case 'http':
				return httpClassRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
