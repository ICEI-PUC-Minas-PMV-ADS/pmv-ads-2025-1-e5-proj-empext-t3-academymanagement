import { IClassFilters } from '../../interfaces';

export interface IClassFiltersProps {
	filterKey: keyof IClassFilters;
	value: IClassFilters[keyof IClassFilters];
}

export interface ITableToolbarProps {
	filters: IClassFilters;
	onFilters: ({ filterKey, value }: IClassFiltersProps) => void;
}
