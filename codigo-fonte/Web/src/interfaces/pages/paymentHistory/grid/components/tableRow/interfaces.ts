import { IPaymentHistoryEntity } from '../../../../../../domain/entities/IPaymentHistoryEntity';
import { IPaymentHistoryFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: IPaymentHistoryEntity;
	onSelectRow: VoidFunction;
	filters: IPaymentHistoryFilters;
	onDeleteRow: VoidFunction;
}
