import { ISubscriptionFilters } from '../../interfaces';

export interface ISubscriptionFiltersProps {
	filterKey: keyof ISubscriptionFilters;
	value: ISubscriptionFilters[keyof ISubscriptionFilters];
}

export interface ITableToolbarProps {
	filters: ISubscriptionFilters;
	onFilters: ({ filterKey, value }: ISubscriptionFiltersProps) => void;
}
