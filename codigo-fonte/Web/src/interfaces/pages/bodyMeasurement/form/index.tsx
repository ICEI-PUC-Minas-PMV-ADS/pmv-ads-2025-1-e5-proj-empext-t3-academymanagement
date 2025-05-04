'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, MenuItem, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Routes } from '../../../../app/routes';
import { IUserEntity } from '../../../../domain/entities/IUserEntity';
import { useBodyMeasurementRepository } from '../../../../infrastructure/repositories/bodyMeasurement';
import { useUserRepository } from '../../../../infrastructure/repositories/user';
import {
	FormProvider,
	RHFSelect,
	RHFTextField,
} from '../../../components/hookForm';
import { useBoolean } from '../../../hooks/useBoolean';
import { IStateForm } from './types/defaultStateForm';
import { IFormProps } from './types/formProps';
import { generateDefaultValues } from './utils/defaultValues';
import { BodyMeasurementSchema } from './validators/schema';

export const BodyMeasurementForm = ({ editBodyMeasurement }: IFormProps) => {
	const router = useRouter();
	const isEditMod = useBoolean(false);

	const bodyMeasurementRepository = useBodyMeasurementRepository();
	const userRepository = useUserRepository();

	const [users, setUsers] = useState<IUserEntity[]>([]);

	const defaultValues = useMemo(
		() => generateDefaultValues(editBodyMeasurement),
		[editBodyMeasurement],
	);

	const formContext = useForm({
		resolver: yupResolver(BodyMeasurementSchema(isEditMod.value)),
		defaultValues,
	});

	const { watch, setValue } = formContext;

	const weight = watch('weight');
	const height = watch('height');

	useEffect(() => {
		const w = typeof weight === 'string' ? parseFloat(weight) : weight;
		const h = typeof height === 'string' ? parseFloat(height) : height;

		if (!isNaN(w) && !isNaN(h) && h > 0) {
			const calculatedBmi = w / (h * h);
			setValue('bmi', parseFloat(calculatedBmi.toFixed(2)), {
				shouldValidate: true,
			});
		}
	}, [weight, height, setValue]);

	useEffect(() => {
		if (editBodyMeasurement?.id) isEditMod.onTrue();
	}, [editBodyMeasurement]);

	const onSubmit = async ({ id, ...data }: IStateForm) => {
		try {
			let response = {};

			if (isEditMod.value)
				response = await bodyMeasurementRepository.update({
					id,
					...data,
				});
			else response = await bodyMeasurementRepository.create(data);

			if (response) {
				enqueueSnackbar('Medida corporal salva com sucesso!');
				router.push(Routes.bodyMeasurement);
			} else {
				enqueueSnackbar(
					isEditMod.value
						? 'Erro ao editar a medida corporal!'
						: 'Erro ao cadastrar a medida corporal!',
					{ variant: 'error' },
				);
			}
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Erro interno da aplicação!', { variant: 'error' });
		}
	};

	const getUsers = async () => {
		try {
			const response = await userRepository.getAll();

			if (response.success) {
				setUsers(response.data || []);
			} else {
				enqueueSnackbar('Usuário não encontrado', {
					variant: 'error',
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<Box sx={{ width: '90%', minWidth: '350px', p: 5 }}>
			<FormProvider
				methods={formContext}
				onSubmit={formContext.handleSubmit(onSubmit)}
			>
				<Card sx={{ p: 3 }}>
					<Box sx={{ pb: 5 }}>
						<Typography
							sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}
						>
							{isEditMod.value
								? 'Edição de Medidas'
								: 'Cadastro de Medidas'}
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
							<RHFTextField
								name='weight'
								label='Peso (kg)'
								type='number'
							/>
							<RHFTextField
								name='height'
								label='Altura (m)'
								type='number'
							/>
							<RHFTextField
								name='waist'
								label='Cintura (cm)'
								type='number'
							/>
							<RHFTextField
								name='hip'
								label='Quadril (cm)'
								type='number'
							/>
							<RHFTextField
								name='body_fat'
								label='% Gordura Corporal'
								type='number'
							/>
							<RHFTextField
								name='bmi'
								label='IMC'
								type='number'
								disabled
							/>
							<RHFSelect name='user_id' label='Usuário'>
								{users.map((user) => (
									<MenuItem key={user.id} value={user.id}>
										{user.name}
									</MenuItem>
								))}
							</RHFSelect>
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
									: 'Cadastrar Medidas'}
							</LoadingButton>
						</Stack>
					</Box>
				</Card>
			</FormProvider>
		</Box>
	);
};
