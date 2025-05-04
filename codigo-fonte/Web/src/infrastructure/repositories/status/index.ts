import { useMemo } from 'react';
import { IStatusRepository } from '../../../domain/repositories/IStatus.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { httpStatusRepository } from './httpStatusRepository';
import { mockStatusRepository } from './mockStatusRepository';

export const useStatusRepository = (
	type?: IRepositorysType,
): IStatusRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockStatusRepository;
			case 'http':
				return httpStatusRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
