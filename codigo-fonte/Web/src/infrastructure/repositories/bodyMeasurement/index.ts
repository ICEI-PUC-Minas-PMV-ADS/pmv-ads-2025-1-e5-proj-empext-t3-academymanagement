import { useMemo } from 'react';
import { IUserRepository } from '../../../domain/repositories/IUser.repo';
import { IRepositorysType } from '../../../types/IRepositorys';
import { httpBodyMeasurementRepository } from './httpBodyMeasurementRepository';
import { mockBodyMeasurementRepository } from './mockBodyMeasurementRepository';

export const useBodyMeasurementRepository = (
	type?: IRepositorysType,
): IUserRepository => {
	const repositoryType =
		type ||
		(process.env.NEXT_PUBLIC_DEFAULT_REPO_TYPE as IRepositorysType) ||
		'http';

	const repository = useMemo(() => {
		switch (repositoryType) {
			case 'mock':
				return mockBodyMeasurementRepository;
			case 'http':
				return httpBodyMeasurementRepository;
			default:
				throw new Error(`Unknown repository type: ${repositoryType}`);
		}
	}, [repositoryType]);

	return repository;
};
