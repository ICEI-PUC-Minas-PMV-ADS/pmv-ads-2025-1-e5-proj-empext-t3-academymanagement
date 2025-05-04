'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Card,
	IconButton,
	InputAdornment,
	Stack,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Routes } from '../../../../app/routes';
import { useClassRepository } from '../../../../infrastructure/repositories/class';
import { randomPassword } from '../../../../infrastructure/utils/randomPassword';
import { FormProvider, RHFTextField } from '../../../components/hookForm';
import { Icon } from '../../../components/icon';
import { useBoolean } from '../../../hooks/useBoolean';
import { IStateForm } from './types/defaultStateForm';
import { IFormProps } from './types/formProps';
import { generateDefaultValues } from './utils/defaultValues';
import { ClassSchema } from './validators/schema';

export const ClassForm = ({ editClass }: IFormProps) => {
	const router = useRouter();
	const isEditMod = useBoolean(false);

	const classRepository = useClassRepository();

	const defaultValues = useMemo(
		() => generateDefaultValues(editClass),
		[editClass],
	);

	const formContext = useForm({
		resolver: yupResolver(ClassSchema(isEditMod.value)),
		defaultValues,
	});

	const generateRandomPassword = () => {
		const password = randomPassword();
		formContext.setValue('password', password);
	};

	useEffect(() => {
		if (editClass?.id) isEditMod.onTrue();
	}, [editClass]);

	const onSubmit = async ({ id, ...data }: IStateForm) => {
		try {
			let response = {};

			if (isEditMod.value)
				response = await classRepository.update({
					id,
					...data,
				});
			else response = await classRepository.create(data);

			if (response) {
				enqueueSnackbar('Usuário cadastrado com Sucesso!');
				router.push(Routes.class);
			} else
				enqueueSnackbar(
					isEditMod.value
						? 'Erro ao editar o Usuário!'
						: 'Erro ao cadastrar o Usuário!',
					{ variant: 'error' },
				);
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Erro interno da aplicação!', { variant: 'error' });
		}
	};

	return (
		<Box sx={{ width: '90%', minWidth: '350px', p: 5 }}>
			<FormProvider
				methods={formContext}
				onSubmit={formContext.handleSubmit((data) => onSubmit(data))}
			>
				<Card sx={{ p: 3 }}>
					<Box sx={{ pb: 5 }}>
						<Typography
							sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}
						>
							{isEditMod.value
								? 'Edição de Usuários'
								: 'Cadastro de Usuários'}
						</Typography>
					</Box>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Stack
							display='grid'
							width='100%'
							gap={3}
							gridTemplateColumns={{
								xs: 'repeat(1, 1fr)',
								sm: 'repeat(2, 1fr)',
							}}
						>
							<RHFTextField name='name' label='Nome completo' />
							<RHFTextField name='email' label='Email' />
							<RHFTextField
								name='password'
								label={
									isEditMod.value ? 'Editar Senha' : 'Senha'
								}
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
						<Stack
							sx={{
								width: '100%',
								display: 'flex',
								alignItems: 'flex-end',
								mt: 5,
							}}
						>
							<LoadingButton
								type='submit'
								variant='contained'
								loading={formContext.formState.isSubmitting}
							>
								{isEditMod.value
									? 'Salvar Alterações'
									: 'Cadastrar Usuário'}
							</LoadingButton>
						</Stack>
					</Box>
				</Card>
			</FormProvider>
		</Box>
	);
};
