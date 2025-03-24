import { Dialog, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useAppSelector } from '../../../../infrastructure/contexts';
import { IPopupContainerProps } from './interfaces';

export const PopupContainer = ({
	children,
	isOpen,
	onClose,
	sx,
}: IPopupContainerProps) => {
	const theme = useTheme();
	const { themeMode } = useAppSelector((state) => state.settings);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (
			(event.key === 'Escape' ||
				event.key === 'Esc' ||
				event.key === ' ' ||
				event.code === 'Space') &&
			!!onClose
		) {
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			fullWidth
			sx={{
				zIndex: 1300,
			}}
			PaperProps={{
				sx: {
					height: 'fit-content',
					maxHeight: '90vh',
					minHeight: '70vh',
					border: `solid 3px ${
						themeMode === 'dark'
							? theme.palette.background.neutral
							: '#a2aec2'
					}`,
					boxShadow: '0px 0px 4px 1px #00000050',
					maxWidth: '600px',
					margin: 'auto',
					...sx,
				},
			}}
		>
			{children}
		</Dialog>
	);
};
