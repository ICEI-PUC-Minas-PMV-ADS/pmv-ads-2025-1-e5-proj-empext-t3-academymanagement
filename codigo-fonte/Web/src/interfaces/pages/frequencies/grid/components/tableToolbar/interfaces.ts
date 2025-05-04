import { IFrequencyFilters } from '../../interfaces';

export interface IFrequencyFiltersProps {
	filterKey: keyof IFrequencyFilters;
	value: IFrequencyFilters[keyof IFrequencyFilters];
}

export interface ITableToolbarProps {
	filters: IFrequencyFilters;
	onFilters: ({ filterKey, value }: IFrequencyFiltersProps) => void;
}
