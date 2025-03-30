import { Routes } from '../../../../app/routes';
import { INavBarRoutes } from '../navBar/types/INavBarRoutes';

export const navBarDefault: INavBarRoutes[] = [
	{
		title: 'Usuários',
		icon: 'users',
		route: Routes.user,
	},
];
