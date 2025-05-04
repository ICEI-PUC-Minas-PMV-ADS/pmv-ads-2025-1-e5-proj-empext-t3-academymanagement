import { useMemo } from 'react';
import { IFrequencyRepository } from '../../../domain/repositories/IFrequency.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { httpFrequencyRepository } from './httpFrequencyRepository';
import { mockFrequencyRepository } from './mockFrequencyRepository';

export const useFrequencyRepository = (
	type?: IRepositorysType,
): IFrequencyRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockFrequencyRepository;
			case 'http':
				return httpFrequencyRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
