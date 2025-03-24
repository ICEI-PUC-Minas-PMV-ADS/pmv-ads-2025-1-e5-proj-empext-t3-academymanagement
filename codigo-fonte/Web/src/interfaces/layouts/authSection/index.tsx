'use client';

import { Box, Stack, useTheme } from '@mui/material';
import { CarouselAuth } from './components/carousel';
import { HeaderAuthLayout } from './components/header';
import { IAuthSectionProps } from './types';

export const AuthSectionLayout = ({ children }: IAuthSectionProps) => {
	const theme = useTheme();
	return (
		<Stack
			component='main'
			direction='row'
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100vw',
				height: '100vh',
			}}
		>
			<CarouselAuth />

			<Stack
				sx={{
					bgcolor: theme.palette.background.home,
					backdropFilter: 'blur(5px)',
					width: '100%',
					height: '100%',
					px: '5%',
					pb: '5%',
					pt: '7%',
				}}
			>
				<HeaderAuthLayout />

				<Box
					component='div'
					sx={{
						display: 'flex',
						flex: 1,
						alignItems: 'flex-end',
						justifyContent: 'center',
					}}
				>
					{children}
				</Box>
			</Stack>
		</Stack>
	);
};
