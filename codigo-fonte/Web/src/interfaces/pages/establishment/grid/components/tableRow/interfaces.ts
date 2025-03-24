import { IEstablishmentEntitye } from '../../../../../../domain/entities/IEstablishmentEntitye';
import { IEstablishmentFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: IEstablishmentEntitye;
	onSelectRow: VoidFunction;
	filters: IEstablishmentFilters;
	onDeleteRow: VoidFunction;
}
