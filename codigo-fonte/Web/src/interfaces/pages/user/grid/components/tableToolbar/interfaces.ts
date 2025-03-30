import { IUserFilters } from '../../interfaces';

export interface IUserFiltersProps {
	filterKey: keyof IUserFilters;
	value: IUserFilters[keyof IUserFilters];
}

export interface ITableToolbarProps {
	filters: IUserFilters;
	onFilters: ({ filterKey, value }: IUserFiltersProps) => void;
}
