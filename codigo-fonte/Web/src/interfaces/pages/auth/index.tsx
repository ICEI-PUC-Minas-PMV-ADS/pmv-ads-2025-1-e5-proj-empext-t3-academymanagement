'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	IconButton,
	InputAdornment,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Routes } from '../../../app/routes';
import { useAppDispatch } from '../../../infrastructure/contexts';
import { setAppContext } from '../../../infrastructure/contexts/app';
import { mockAuthRepository } from '../../../infrastructure/repositories/auth/mockAuthRepository';
import { FormProvider, RHFTextField } from '../../components/hookForm';
import { Icon } from '../../components/icon';
import { useBoolean } from '../../hooks/useBoolean';
import { LoginSchema } from './schema';

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const router = useRouter();

	const resetPasswordLoading = useBoolean(false);
	const toogleViewPassword = useBoolean();

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = handleSubmit(async ({ email, password }) => {
		try {
			const authData = await mockAuthRepository.login({
				email,
				password,
			});

			if (!authData || !authData.accessToken)
				enqueueSnackbar(
					'Verifique seu usuário e senha e tente novamente!',
					{ variant: 'error' },
				);
			else {
				enqueueSnackbar('Usuário Autenticado com Sucesso!');

				dispatch(
					setAppContext({
						token: authData.accessToken,
						user: {
							name: authData.name,
							email: authData.email,
						},
					}),
				);

				router.push(Routes.establishment);
			}
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
			<FormProvider methods={methods} onSubmit={onSubmit}>
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
								Realizar Login
							</Typography>
							<Typography
								variant='body2'
								sx={{
									fontSize: '0.8rem',
									fontWeight: 'lighter',
									color: theme.palette.text.secondary,
								}}
							>
								Informe o seu email e senha para realizar login!
							</Typography>
						</Box>

						<RHFTextField name='email' label='Email' />

						<RHFTextField
							name='password'
							label='Senha'
							type={
								toogleViewPassword.value ? 'text' : 'password'
							}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={
												toogleViewPassword.onToggle
											}
											edge='end'
										>
											<Icon
												icon={
													toogleViewPassword.value
														? 'eye-slash'
														: 'eye'
												}
												type='regular'
												size='1.25x'
												cursor='pointer'
												color={
													theme.palette.text.secondary
												}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<LoadingButton
							sx={{
								width: !resetPasswordLoading.value
									? '130px'
									: '0px',
								height: '27px',
								p: 0,
							}}
							loading={resetPasswordLoading.value}
							onClick={resetPasswordLoading.onTrue}
						>
							{!resetPasswordLoading.value && (
								<Link
									href={'dadasd'}
									passHref
									style={{
										color: theme.palette.text.primary,
										textUnderlineOffset: '5px',
									}}
								>
									Esqueceu a senha?
								</Link>
							)}
						</LoadingButton>
					</Stack>

					<LoadingButton
						fullWidth
						size='large'
						type='submit'
						variant='contained'
						loading={isSubmitting}
					>
						Realizar Login
					</LoadingButton>
				</Stack>
			</FormProvider>
		</Box>
	);
};
