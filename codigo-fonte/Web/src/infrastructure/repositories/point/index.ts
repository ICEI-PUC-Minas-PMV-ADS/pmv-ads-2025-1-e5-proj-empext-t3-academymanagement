import { useMemo } from 'react';
import { IPointRepository } from '../../../domain/repositories/IPoint.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { mockPointRepository } from './mockPointRepository';

export const usePointRepository = (
	type?: IRepositorysType,
): IPointRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockPointRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
