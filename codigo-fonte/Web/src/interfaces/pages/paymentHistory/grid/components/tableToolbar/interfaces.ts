import { IPaymentHistoryFilters } from '../../interfaces';

export interface IPaymentHistoryFiltersProps {
	filterKey: keyof IPaymentHistoryFilters;
	value: IPaymentHistoryFilters[keyof IPaymentHistoryFilters];
}

export interface ITableToolbarProps {
	filters: IPaymentHistoryFilters;
	onFilters: ({ filterKey, value }: IPaymentHistoryFiltersProps) => void;
}
