import { useCallback, useState } from 'react';
import { IStatusCountEntity } from '../../../domain/entities/IStatusEntity';
import { useStatusRepository } from '../../../infrastructure/repositories/status';

const initialState: IStatusCountEntity = {
	classe: 0,
	frequency: 0,
	subscription: 0,
	user: 0,
};

export const useStatusCount = () => {
	const statusRepository = useStatusRepository();
	const [data, setData] = useState<IStatusCountEntity>(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchStatusCount = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await statusRepository.count();

			if (response?.data) {
				setData(response.data);
			}
		} catch (err) {
			setError(
				err instanceof Error
					? err
					: new Error('Failed to fetch status count'),
			);
		} finally {
			setIsLoading(false);
		}
	}, [statusRepository]);

	return {
		data,
		isLoading,
		error,
		fetchStatusCount,
	};
};
