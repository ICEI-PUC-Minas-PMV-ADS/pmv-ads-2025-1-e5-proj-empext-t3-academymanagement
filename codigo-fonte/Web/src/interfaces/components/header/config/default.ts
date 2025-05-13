import { Routes } from '../../../../app/routes';
import { INavBarRoutes } from '../navBar/types/INavBarRoutes';

export const navBarDefault: INavBarRoutes[] = [
	{
		title: 'Dashboard',
		icon: 'home',
		route: Routes.dashboard,
	},
	{
		title: 'Gestão do Sistema',
		icon: 'gears',
		children: [
			{
				title: 'Usuários',
				icon: 'users',
				route: Routes.user,
			},
			{
				title: 'Frequencias',
				icon: 'calendar-check',
				route: Routes.frequencies,
			},
			{
				title: 'Histórico de Pagamentos',
				icon: 'money-bill',
				route: Routes.paymentHistory,
			},
			{
				title: 'Assinaturas',
				icon: 'book-font',
				route: Routes.subscription,
			},
			{
				title: 'Classes de Aula',
				icon: 'users-class',
				route: Routes.class,
			},
			{
				title: 'Medidas dos Alunos',
				icon: 'ruler',
				route: Routes.bodyMeasurement,
			},
		],
	},
	{
		title: 'Relatórios',
		icon: 'print',
		children: [
			{
				title: 'Frequencias',
				icon: 'calendar-check',
				route: Routes.frequencyChart,
			},
			{
				title: 'Medidas dos Alunos',
				icon: 'ruler',
				route: Routes.bmiChart,
			},
		],
	},
];
