'use client';

import { Badge, Stack, Typography, Zoom } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../infrastructure/contexts';
import {
	closeDrawerSettings,
	onResetSettings,
	onUpdateSettings,
} from '../../../infrastructure/contexts/settings';
import { ISettingsState } from '../../../infrastructure/contexts/settings/types/ISettingsState';
import { paper } from '../../styles/theme/css';
import { Icon } from '../icon';
import Scrollbar from '../scrollbar/Scrollbar';
import { BaseOptions } from './components/baseOptions';
import { FullScreenOption } from './components/fullscreenOption';

export { SettingsButton } from './components/configButton';

export const SettingsDrawer = () => {
	const theme = useTheme();
	const dispatch = useAppDispatch();

	const { themeMode, canReset, isActiveDrawer } = useAppSelector(
		(state) => state.settings,
	);

	const labelStyles = {
		mb: 1.5,
		color: 'text.disabled',
		fontWeight: 'fontWeightSemiBold',
	};

	const renderHead = (
		<Stack
			direction='row'
			alignItems='center'
			justifyContent='space-between'
			sx={{ py: 2, display: 'flex', gap: 2, pr: 1, pl: 2.5 }}
		>
			<Typography variant='h6' sx={{ flexGrow: 1 }}>
				Configurações
			</Typography>

			<Tooltip
				TransitionComponent={Zoom}
				TransitionProps={{ timeout: 300 }}
				arrow
				disableInteractive
				title='Resetar Configurações'
			>
				<IconButton onClick={() => dispatch(onResetSettings())}>
					<Badge color='error' variant='dot' invisible={!canReset}>
						<Icon
							icon='redo'
							color={theme.palette.action.active}
							type='solid'
							cursor='pointer'
						/>
					</Badge>
				</IconButton>
			</Tooltip>

			<IconButton onClick={() => dispatch(closeDrawerSettings())}>
				<Icon
					icon='close'
					color={theme.palette.action.active}
					type='solid'
					cursor='pointer'
				/>
			</IconButton>
		</Stack>
	);

	const renderMode = (
		<div>
			<Typography
				variant='caption'
				component='div'
				sx={{ ...labelStyles, color: theme.palette.text.secondary }}
			>
				Tema da Aplicação
			</Typography>

			<BaseOptions
				value={themeMode}
				onChange={(newValue: any) =>
					dispatch(
						onUpdateSettings({
							themeMode: newValue as ISettingsState['themeMode'],
						}),
					)
				}
				options={['light', 'dark']}
			/>
		</div>
	);

	return (
		<Drawer
			anchor='right'
			open={isActiveDrawer}
			onClose={() => dispatch(closeDrawerSettings())}
			slotProps={{
				backdrop: { invisible: true },
			}}
			sx={{
				[`& .${drawerClasses.paper}`]: {
					...paper({
						theme,
						bgcolor: theme.palette.background.paper,
					}),
					width: '100%',
					maxWidth: 350,
				},
			}}
		>
			{renderHead}

			<Divider sx={{ borderStyle: 'dashed' }} />

			<Scrollbar sx={{ height: '100%' }}>
				<Stack spacing={3} sx={{ p: 3 }}>
					{renderMode}
				</Stack>
			</Scrollbar>

			<FullScreenOption />
		</Drawer>
	);
};
