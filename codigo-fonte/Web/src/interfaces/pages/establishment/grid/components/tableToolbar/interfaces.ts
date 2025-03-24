import { IEstablishmentFilters } from '../../interfaces';

export interface IEstablishmentFiltersProps {
	filterKey: keyof IEstablishmentFilters;
	value: IEstablishmentFilters[keyof IEstablishmentFilters];
}

export interface ITableToolbarProps {
	filters: IEstablishmentFilters;
	onFilters: ({ filterKey, value }: IEstablishmentFiltersProps) => void;
}
