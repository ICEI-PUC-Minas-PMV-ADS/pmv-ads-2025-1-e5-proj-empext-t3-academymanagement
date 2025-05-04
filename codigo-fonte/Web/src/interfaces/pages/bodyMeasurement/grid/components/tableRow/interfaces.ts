import { IBodyMeasurementEntity } from '../../../../../../domain/entities/IBodyMeasurementEntity';
import { IBodyMeasurementFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: IBodyMeasurementEntity;
	onSelectRow: VoidFunction;
	filters: IBodyMeasurementFilters;
	onDeleteRow: VoidFunction;
}
