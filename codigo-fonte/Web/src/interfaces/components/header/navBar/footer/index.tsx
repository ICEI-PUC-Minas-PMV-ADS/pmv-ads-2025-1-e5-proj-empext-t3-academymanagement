import { LoadingButton } from '@mui/lab';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { useAppSelector } from '../../../../../infrastructure/contexts';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { useBoolean } from '../../../../hooks/useBoolean';
import { Icon } from '../../../icon';

export const FooterNavBar = () => {
	const theme = useTheme();
	const { themeMode } = useAppSelector((state) => state.settings);
	const { closeSession } = useAuthentication();
	const isLoading = useBoolean(false);

	const handleCloseSession = () => {
		isLoading.onTrue();
		closeSession();
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				gap: 1.5,
			}}
		>
			<LoadingButton
				onClick={handleCloseSession}
				variant='outlined'
				loading={isLoading.value}
				sx={{
					'width': '100%',
					'minHeight': '40px',
					'display': 'flex',
					'background': theme.palette.background.home,
					'transition': 'all .3s',
					'border': `solid 2px ${theme.palette.background.home}`,
					'color': theme.palette.text.secondary,
					'fontWeight': 'bold',
					'borderRadius': '5px',
					'gap': 1.5,
					'boxShadow': '0px 0px 3px 1px #00000030',
					'alignItems': 'center',
					'justifyContent': 'center',
					':hover': {
						border: `solid 2px ${theme.palette.text.secondary}`,
						background:
							themeMode === 'dark'
								? alpha(theme.palette.background.neutral, 0.1)
								: alpha(theme.palette.background.home, 0.5),
					},
				}}
			>
				{!isLoading.value && (
					<>
						<Icon
							style={{
								rotate: '180deg',
							}}
							icon='sign-out-alt'
							type='regular'
							size='1.25x'
							color={theme.palette.text.secondary}
						/>
						<Typography
							variant='body1'
							sx={{
								color: theme.palette.text.secondary,
								fontWeight: 600,
								fontSize: '1rem',
							}}
						>
							Encerrar Sessão
						</Typography>
					</>
				)}
			</LoadingButton>
			<Typography
				variant='caption'
				sx={{
					color: theme.palette.text.secondary,
					fontWeight: 600,
				}}
			>
				Versão 1.0.0
			</Typography>
		</Box>
	);
};
