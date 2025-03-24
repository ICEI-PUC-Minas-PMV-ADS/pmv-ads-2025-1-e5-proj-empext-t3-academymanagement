'use client';

import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	Toolbar,
	useTheme,
} from '@mui/material';
import { useResponsive } from '../../../hooks/useResponsive';
import { SettingsButton } from '../../settings';
import { IToolBarProps } from './types';

export const ToolBar = ({ isActiveNavBar }: IToolBarProps) => {
	const theme = useTheme();
	const upMd = useResponsive('down', 'md');

	return (
		<AppBar
			position='static'
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				width: '100%',
				height: '65px',
				px: 2,
				py: 0,
			}}
		>
			<Box sx={{ display: 'flex', gap: 3 }}>
				{upMd && (
					<IconButton sx={{ p: 0 }} onClick={isActiveNavBar.onTrue}>
						<Box
							component='span'
							className='svg-color'
							sx={{
								width: 25,
								height: 25,
								display: 'inline-block',
								bgcolor: 'currentColor',
								mask: `url(/images/icons/menu.svg) no-repeat center / contain`,
								WebkitMask: `url(/images/icons/menu.svg) no-repeat center / contain`,
							}}
						/>
					</IconButton>
				)}
			</Box>
			<Toolbar
				sx={{
					display: 'flex',
					flex: 1,
					gap: 2,
					padding: '0 !important',
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}
			>
				<SettingsButton />
				<Avatar sx={{ background: theme.palette.secondary.main }} />
			</Toolbar>
		</AppBar>
	);
};
