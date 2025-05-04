import { useMemo } from 'react';
import { IPaymentHistoryRepository } from '../../../domain/repositories/IPaymentHistory.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { httpPaymentHistoryRepository } from './httpPaymentHistoryRepository';
import { mockPaymentHistoryRepository } from './mockPaymentHistoryRepository';

export const usePaymentHistoryRepository = (
	type?: IRepositorysType,
): IPaymentHistoryRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockPaymentHistoryRepository;
			case 'http':
				return httpPaymentHistoryRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
