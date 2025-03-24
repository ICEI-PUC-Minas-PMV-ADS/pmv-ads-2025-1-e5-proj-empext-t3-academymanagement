import { DialogActions, Divider, useTheme } from '@mui/material';
import { useAppSelector } from '../../../../../infrastructure/contexts';
import { IPopupFooterActionsProps } from './interfaces';

export const PopupFooterActions = ({
	sx,
	buttons,
}: IPopupFooterActionsProps) => {
	const theme = useTheme();
	const { themeMode } = useAppSelector((state) => state.settings);

	return (
		<>
			<Divider
				sx={{
					borderWidth: '1.5px',
					borderColor:
						themeMode === 'dark'
							? theme.palette.background.neutral
							: '#a2aec2',
				}}
			/>
			<DialogActions
				sx={{
					p: 2,
					...sx,
				}}
			>
				{buttons.map((btn) => btn)}
			</DialogActions>
		</>
	);
};
