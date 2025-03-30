'use client';

import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Logo } from '../../../../components/logo';

export const HeaderHomeLayout = () => {
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
				gap: '20px',
			}}
		>
			<Logo width={150} height={150} />
			<Stack spacing={2} sx={{ alignItems: 'center' }}>
				<Typography
					variant='body1'
					sx={{ fontSize: '1.4rem', fontWeight: 600 }}
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
						top: 0,
					}}
				>
					Solução inteligente para gestão de matrículas, controle de
					frequência e muito mais!
				</Typography>
			</Stack>
		</Box>
	);
};
