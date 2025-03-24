'use client';

import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { Routes } from '../../../app/routes';
import { useBoolean } from '../../hooks/useBoolean';
import { CarouselHome } from './components/carousel';
import { HeaderHomeLayout } from './components/header';

export const HomePage = () => {
	const isSubmitting = useBoolean(false);
	const router = useRouter();

	const theme = useTheme();

	const handleEntry = async () => {
		isSubmitting.onTrue();
		router.push(Routes.auth);
	};

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
			<CarouselHome />

			<Stack
				sx={{
					bgcolor: theme.palette.background.paper,
					backdropFilter: 'blur(5px)',
					width: '100%',
					height: '100%',
					px: '5%',
					pb: '5%',
					pt: '7%',
				}}
			>
				<HeaderHomeLayout />

				<Box
					component='div'
					sx={{
						display: 'flex',
						flex: 1,
						alignItems: 'flex-end',
						justifyContent: 'center',
					}}
				>
					<Box
						sx={{
							width: '100%',
							height: '100%',
							p: 0,
							pt: '10px',
							m: 0,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-around',
						}}
					>
						<LoadingButton
							fullWidth
							size='large'
							type='submit'
							variant='contained'
							loading={isSubmitting.value}
							onClick={handleEntry}
						>
							Entrar
						</LoadingButton>

						{/* <S.ActionsContainer>
							<Box
								sx={{
									display: 'flex',
									width: '100%',
									alignItems: 'flex-start',
									justifyContent: 'space-around',
								}}
							>
								<IconButton icon='info-circle'>
									TERMOS DE UTILIZAÇÃO
								</IconButton>
								<IconButton icon='question'>AJUDA</IconButton>
							</Box>
						</S.ActionsContainer> */}
					</Box>
				</Box>
			</Stack>
		</Stack>
	);
};
