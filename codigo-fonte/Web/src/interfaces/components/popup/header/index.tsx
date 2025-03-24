import {
	Box,
	DialogTitle,
	Divider,
	IconButton,
	Typography,
	useTheme,
} from '@mui/material';
import { useAppSelector } from '../../../../infrastructure/contexts';
import { Icon } from '../../icon';
import { IPopupContainerProps } from './interfaces';

export const PopupHeader = ({ icon, title, onClose }: IPopupContainerProps) => {
	const theme = useTheme();
	const { themeMode } = useAppSelector((state) => state.settings);

	return (
		<>
			<DialogTitle
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					p: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						flex: 1,
						alignItems: 'center',
						textAlign: 'center',
						justifyContent: 'flex-start',
					}}
				>
					{icon && (
						<Icon
							icon={icon}
							type='solid'
							size='1.25x'
							color={theme.palette.table.header.text}
						/>
					)}
					<Typography sx={{ fontSize: '1.15rem' }}>
						{title}
					</Typography>
				</Box>
				{!!onClose && (
					<IconButton onClick={onClose}>
						<Icon
							icon='close'
							type='solid'
							color='inherit'
							cursor='pointer'
							size='1.25x'
						/>
					</IconButton>
				)}
			</DialogTitle>
			<Divider
				sx={{
					borderWidth: '1.5px',
					borderColor:
						themeMode === 'dark'
							? theme.palette.background.neutral
							: '#a2aec2',
				}}
			/>
		</>
	);
};
