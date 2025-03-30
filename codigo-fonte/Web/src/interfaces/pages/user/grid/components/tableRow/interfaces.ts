import { IUserEntity } from '../../../../../../domain/entities/IUserEntity';
import { IUserFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: IUserEntity;
	onSelectRow: VoidFunction;
	filters: IUserFilters;
	onDeleteRow: VoidFunction;
}
