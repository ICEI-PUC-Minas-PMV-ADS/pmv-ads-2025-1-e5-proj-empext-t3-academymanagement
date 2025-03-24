import { Routes } from '../../../../app/routes';
import { INavBarRoutes } from '../navBar/types/INavBarRoutes';

export const navBarDefault: INavBarRoutes[] = [
	{
		title: 'Estabelecimentos',
		icon: 'building',
		route: Routes.establishment,
	},
	{
		title: 'Usuários',
		icon: 'users',
		route: Routes.user,
	},
	{
		title: 'Clientes',
		icon: 'user',
		route: Routes.client,
	},
	{
		title: 'Programa de Pontos',
		icon: 'star',
		route: Routes.point,
	},
];
