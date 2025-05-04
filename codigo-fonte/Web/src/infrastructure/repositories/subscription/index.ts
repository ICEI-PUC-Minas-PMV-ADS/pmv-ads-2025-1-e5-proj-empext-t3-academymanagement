import { useMemo } from 'react';
import { ISubscriptionRepository } from '../../../domain/repositories/ISubscription.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { httpSubscriptionRepository } from './httpSubscriptionRepository';
import { mockSubscriptionRepository } from './mockSubscriptionRepository';

export const useSubscriptionRepository = (
	type?: IRepositorysType,
): ISubscriptionRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockSubscriptionRepository;
			case 'http':
				return httpSubscriptionRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
