import { IClasseEntity } from '../../../../../../domain/entities/IClasseEntity';
import { IClassFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: IClasseEntity;
	onSelectRow: VoidFunction;
	filters: IClassFilters;
	onDeleteRow: VoidFunction;
}
