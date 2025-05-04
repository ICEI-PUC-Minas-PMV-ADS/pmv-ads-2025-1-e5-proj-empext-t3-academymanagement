import { IBodyMeasurementFilters } from '../../interfaces';

export interface IBodyMeasurementFiltersProps {
	filterKey: keyof IBodyMeasurementFilters;
	value: IBodyMeasurementFilters[keyof IBodyMeasurementFilters];
}

export interface ITableToolbarProps {
	filters: IBodyMeasurementFilters;
	onFilters: ({ filterKey, value }: IBodyMeasurementFiltersProps) => void;
}
