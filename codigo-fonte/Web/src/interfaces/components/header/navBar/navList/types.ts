import { INavBarProps } from '../types/INavBarProps';
import { INavBarRoutes } from '../types/INavBarRoutes';

export type INavBarListProps = INavBarProps;

export interface INavBarListItemProps {
	item: INavBarRoutes;
	activeRoute: string;
	handleNavigate: (route: string) => void;
}

export interface INavBarListToogleProps {
	item: INavBarRoutes;
	isOpen: boolean;
	handleToggleGroup: (title: string) => void;
}
