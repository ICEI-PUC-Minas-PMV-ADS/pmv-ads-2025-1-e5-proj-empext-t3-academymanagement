'use client';

import { Box, Stack, Typography, useTheme } from '@mui/material';
import { Logo } from '../../../../components/logo';

export const HeaderAuthLayout = () => {
	const theme = useTheme();

	return (
		<Box
			component='div'
			sx={{
				width: '100%',
				justifyContent: 'flex-end',
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				mb: 2.8,
			}}
		>
			<Logo width={150} height={150} />
			<Stack spacing={1} sx={{ alignItems: 'center' }}>
				<Typography
					variant='body1'
					sx={{
						fontWeight: 600,
						fontSize: '1.4rem',
						color: theme.palette.text.primary,
					}}
				>
					Gerenciador de Academia
				</Typography>
				<Typography
					variant='body2'
					sx={{
						textAlign: 'center',
						fontSize: '0.8rem',
						fontWeight: 'lighter',
						color: theme.palette.text.secondary,
					}}
				>
					Solução inteligente para gestão de matrículas, controle de
					frequência e muito mais!
				</Typography>
			</Stack>
		</Box>
	);
};
