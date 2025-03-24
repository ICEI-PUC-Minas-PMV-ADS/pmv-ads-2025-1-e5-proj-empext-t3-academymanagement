import { useCallback, useState } from 'react';
import { IUserFiltersProps } from './type';

export const useFilters = <T extends Record<string, any>>({
	initialFilters = {} as T,
	onResetPage,
}: IUserFiltersProps<T>) => {
	const [filters, setFilters] = useState<T>(initialFilters);

	const onFilters = useCallback(
		({ filterKey, value }: { filterKey: keyof T; value: T[keyof T] }) => {
			if (onResetPage) onResetPage();
			setFilters((prevState) => ({
				...prevState,
				[filterKey]: value,
			}));
		},
		[onResetPage],
	);

	return { filters, setFilters, onFilters };
};
