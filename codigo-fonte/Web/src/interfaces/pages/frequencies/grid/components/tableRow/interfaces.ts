import { IFrequencyEntity } from '../../../../../../domain/entities/IFrequencyEntity';
import { IFrequencyFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: IFrequencyEntity;
	onSelectRow: VoidFunction;
	filters: IFrequencyFilters;
	onDeleteRow: VoidFunction;
}
