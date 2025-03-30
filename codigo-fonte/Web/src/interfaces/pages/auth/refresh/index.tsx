'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Routes } from '../../../../app/routes';
import { useUserRepository } from '../../../../infrastructure/repositories/user';
import { randomPassword } from '../../../../infrastructure/utils/randomPassword';
import { FormProvider, RHFTextField } from '../../../components/hookForm';
import { Icon } from '../../../components/icon';
import { RefreshPasswordSchema } from './schema';

export const RefreshPasswordPage = () => {
	const theme = useTheme();
	const router = useRouter();

	const userRepository = useUserRepository();

	const formContext = useForm({
		resolver: yupResolver(RefreshPasswordSchema),
		defaultValues: {
			password: '',
			repeatPassword: '',
		},
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = formContext;

	const generateRandomPassword = () => {
		const password = randomPassword();
		formContext.setValue('password', password);
		formContext.setValue('repeatPassword', password);
	};

	const onSubmit = handleSubmit(async ({ password }) => {
		try {
			const response = await userRepository.update({
				id: '67d97e039047a622b6e6ee00',
				password,
			});
			if (response) router.push(Routes.auth);
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Erro Interno do Servidor', {
				variant: 'error',
				autoHideDuration: 5000,
			});
		}
	});

	return (
		<Box sx={{ width: '100%' }}>
			<FormProvider methods={formContext} onSubmit={onSubmit}>
				<Stack spacing={8} sx={{ width: '100%', p: 0, m: 0 }}>
					<Stack spacing={2.5} sx={{ width: '100%', p: 0, m: 0 }}>
						<Box>
							<Typography
								variant='body1'
								sx={{
									fontSize: '1.35rem',
									fontWeight: 'bold',
									color: theme.palette.text.primary,
								}}
							>
								Alterar Senha
							</Typography>
							<Typography
								variant='body2'
								sx={{
									fontSize: '0.8rem',
									fontWeight: 'lighter',
									color: theme.palette.text.secondary,
								}}
							>
								Informe sua nova senha para atualizar suas
								credenciais de acesso.
							</Typography>
						</Box>

						<RHFTextField
							name='password'
							label='Nova Senha'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={generateRandomPassword}
											edge='end'
										>
											<Icon
												icon='sync'
												type='regular'
												color='inherit'
												size='1.25x'
												cursor='pointer'
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<RHFTextField
							name='repeatPassword'
							label='Repetir Senha'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={generateRandomPassword}
											edge='end'
										>
											<Icon
												icon='sync'
												type='regular'
												color='inherit'
												size='1.25x'
												cursor='pointer'
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Stack>

					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							gap: 3,
						}}
					>
						<Button
							fullWidth
							size='large'
							variant='outlined'
							sx={{ width: '130px' }}
							onClick={() => router.push(Routes.auth)}
						>
							Voltar
						</Button>
						<LoadingButton
							fullWidth
							size='large'
							type='submit'
							variant='contained'
							loading={isSubmitting}
						>
							Salvar nova senha
						</LoadingButton>
					</Box>
				</Stack>
			</FormProvider>
		</Box>
	);
};
