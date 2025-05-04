import { Box, Collapse, List, ListItem, useTheme } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useNavBarConfig } from '../../config';
import { INavBarRoutes } from '../types/INavBarRoutes';
import { NavBarListItem } from './components/listItem';
import { NavBarListToogle } from './components/listToogle';
import { INavBarListProps } from './types';

export const NavBarList = ({ onCloseNavBar }: INavBarListProps) => {
	const theme = useTheme();
	const router = useRouter();
	const pathname = usePathname();
	const navBarRoutes = useNavBarConfig();

	const [activeRoute, setActiveRoute] = useState<string>(pathname);
	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

	useEffect(() => {
		setActiveRoute(pathname);
	}, [pathname]);

	const handleNavigate = useCallback(
		(route: string) => {
			setActiveRoute(route);
			if (onCloseNavBar) {
				onCloseNavBar();
			}
			router.push(route);
		},
		[onCloseNavBar, router],
	);

	const handleToggleGroup = (groupTitle: string) => {
		setOpenGroups((prev) => {
			const isOpen = prev[groupTitle] || false;
			if (isOpen) return { ...prev, [groupTitle]: false };
			else return { [groupTitle]: true };
		});
	};

	const renderItem = (item: INavBarRoutes) => {
		if (item.children) {
			const isOpen = openGroups[item.title] || false;
			return (
				<Box key={item.title}>
					<ListItem
						disablePadding
						sx={{
							boxShadow: '0px 0px 3px 1px #00000030',
							background: theme.palette.background.home,
							border: `solid 2px ${theme.palette.background.home}`,
							transition: 'all .3s',
							borderRadius: '10px',
						}}
					>
						<NavBarListToogle
							handleToggleGroup={handleToggleGroup}
							isOpen={isOpen}
							item={item}
						/>
					</ListItem>
					<Collapse
						sx={{ mt: 1.5 }}
						in={isOpen}
						timeout='auto'
						unmountOnExit
					>
						<List
							component='div'
							disablePadding
							sx={{
								pl: 4,
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
							}}
						>
							{item.children.map((child: any, index) => (
								<NavBarListItem
									key={index}
									activeRoute={activeRoute}
									item={child}
									handleNavigate={handleNavigate}
								/>
							))}
						</List>
					</Collapse>
				</Box>
			);
		} else
			return (
				<NavBarListItem
					activeRoute={activeRoute}
					item={item}
					handleNavigate={handleNavigate}
				/>
			);
	};

	return (
		<List
			sx={{
				gap: 1.5,
				display: 'flex',
				flex: 1,
				flexDirection: 'column',
			}}
		>
			{navBarRoutes.map(renderItem)}
		</List>
	);
};
