import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { alpha, useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { Icon } from '../../../icon';

export const FullScreenOption = () => {
	const [fullscreen, setFullscreen] = useState(false);
	const theme = useTheme();

	const onToggleFullScreen = useCallback(() => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			setFullscreen(true);
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
			setFullscreen(false);
		}
	}, []);

	return (
		<Box sx={{ p: 2.5 }}>
			<ButtonBase
				onClick={onToggleFullScreen}
				sx={{
					'width': 1,
					'height': 48,
					'px': 2,
					'alignItems': 'center',
					'justifyContent': 'center',
					'borderRadius': 1,
					'color': theme.palette.text.secondary,
					'typography': 'subtitle2',
					'border': (theme) => `solid 1px ${theme.palette.grey[600]}`,
					...(fullscreen && {
						color: 'text.primary',
					}),
					'&:hover': {
						background: alpha(theme.palette.grey[600], 0.25),
					},
					'& .svg-color': {
						background: (theme) =>
							`linear-gradient(135deg, ${theme.palette.grey[600]} 0%, ${theme.palette.grey[700]} 100%)`,
						...(fullscreen && {
							background: (theme) =>
								`linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
						}),
					},
				}}
			>
				{fullscreen ? (
					<Icon
						icon='compress-wide'
						type='solid'
						color={theme.palette.action.active}
						size='1.25x'
					/>
				) : (
					<Icon
						icon='expand'
						type='solid'
						color={theme.palette.action.active}
						size='1.25x'
					/>
				)}

				<div
					style={{
						display: 'flex',
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{fullscreen ? 'Sair do Modo Tela cheia' : 'Modo Tela cheia'}
				</div>
			</ButtonBase>
		</Box>
	);
};
