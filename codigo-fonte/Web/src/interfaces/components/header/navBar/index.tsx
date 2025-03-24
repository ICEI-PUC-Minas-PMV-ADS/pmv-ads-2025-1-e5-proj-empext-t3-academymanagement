'use client';

import { Box, useTheme } from '@mui/material';

import { FooterNavBar } from './footer';
import { HeaderNavbar } from './header';
import { NavBarList } from './navList';
import { INavBarProps } from './types/INavBarProps';

export const NavBar = ({ onCloseNavBar }: INavBarProps) => {
	const theme = useTheme();

	return (
		<Box
			component='nav'
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				gap: 1.5,
				height: '115vh',
				width: '100%',
				maxWidth: '385px',
				background: theme.palette.background.paper,
				zoom: '87%',
			}}
			role='presentation'
		>
			<HeaderNavbar onCloseNavBar={onCloseNavBar} />
			<NavBarList onCloseNavBar={onCloseNavBar} />
			<FooterNavBar />
		</Box>
	);
};
