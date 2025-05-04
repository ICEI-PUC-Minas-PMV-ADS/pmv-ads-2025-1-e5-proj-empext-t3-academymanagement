import { ISubscriptionEntity } from '../../../../../../domain/entities/ISubscriptionEntity';
import { ISubscriptionFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: ISubscriptionEntity;
	onSelectRow: VoidFunction;
	filters: ISubscriptionFilters;
	onDeleteRow: VoidFunction;
}
