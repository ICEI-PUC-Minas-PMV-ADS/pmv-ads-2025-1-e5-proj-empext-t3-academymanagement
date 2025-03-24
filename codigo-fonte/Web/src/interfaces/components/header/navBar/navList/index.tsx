import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	alpha,
	useTheme,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '../../../icon';
import { useNavBarConfig } from '../../config';
import { INavBarListProps } from './types';

export const NavBarList = ({ onCloseNavBar }: INavBarListProps) => {
	const theme = useTheme();
	const router = useRouter();
	const pathname = usePathname();
	const navBarRoutes = useNavBarConfig();

	const [activeRoute, setActiveRoute] = useState<string>(pathname);

	useEffect(() => {
		setActiveRoute(pathname);
	}, [pathname]);

	const handleNavigate = useCallback(
		(route: string) => {
			setActiveRoute(route);

			if (onCloseNavBar) onCloseNavBar();

			router.push(route);
		},
		[onCloseNavBar, router],
	);

	const navBarItems = useMemo(
		() =>
			navBarRoutes.map(({ title, icon, route }) => (
				<ListItem
					key={title}
					disablePadding
					sx={{
						'boxShadow': '0px 0px 3px 1px #00000030',
						'background': theme.palette.background.home,
						'border':
							activeRoute === route
								? `solid 2px ${theme.palette.text.secondary}`
								: `solid 2px ${theme.palette.background.home}`,
						'transition': 'all .3s',
						'color':
							activeRoute === route
								? theme.palette.text.primary
								: theme.palette.text.secondary,
						'fontWeight': 'bold',
						'borderRadius': '10px',
						':hover': {
							border: `solid 2px ${theme.palette.text.secondary}`,
							background: alpha(theme.palette.grey[400], 0.2),
						},
					}}
				>
					<ListItemButton
						sx={{ display: 'flex', gap: 1.5, borderRadius: '10px' }}
						onClick={() => handleNavigate(route)}
					>
						<Icon
							icon={icon}
							color={
								activeRoute === route
									? alpha(theme.palette.text.primary, 0.8)
									: theme.palette.text.secondary
							}
							type='solid'
						/>
						<ListItemText primary={title} />
					</ListItemButton>
				</ListItem>
			)),
		[theme, activeRoute, handleNavigate, navBarRoutes],
	);

	return (
		<List
			sx={{
				gap: 1.5,
				display: 'flex',
				flex: 1,
				flexDirection: 'column',
			}}
		>
			{navBarItems}
		</List>
	);
};
