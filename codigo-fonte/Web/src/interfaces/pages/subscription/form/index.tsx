'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Card,
	IconButton,
	InputAdornment,
	MenuItem,
	Stack,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Routes } from '../../../../app/routes';
import { useSubscriptionRepository } from '../../../../infrastructure/repositories/subscription';
import { FormProvider, RHFTextField } from '../../../components/hookForm';
import { useBoolean } from '../../../hooks/useBoolean';
import { IStateForm } from './types/defaultStateForm';
import { IFormProps } from './types/formProps';
import { generateDefaultValues } from './utils/defaultValues';
import { SubscriptionSchema } from './validators/schema';
import RHFSelect, {
	RHFMultiSelect,
} from '../../../components/hookForm/rhf-select';
import { IUserEntity } from '../../../../domain/entities/IUserEntity';
import { useUserRepository } from '../../../../infrastructure/repositories/user';

export const SubscriptionForm = ({ editSubscriptions }: IFormProps) => {
	const router = useRouter();
	const isEditMod = useBoolean(false);

	const subscriptionRepository = useSubscriptionRepository();
	const userRepository = useUserRepository();
	const [users, setUsers] = useState<IUserEntity[]>([]);

	const defaultValues = useMemo(
		() => generateDefaultValues(editSubscriptions),
		[editSubscriptions],
	);

	const formContext = useForm({
		resolver: yupResolver(SubscriptionSchema(isEditMod.value)),
		defaultValues,
	});

	const getFormDependencies = async () => {
		try {
			const respose = await userRepository.getAll();
			if (respose.success) setUsers(respose.data || []);
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Erro Interno do Servidor!', { variant: 'error' });
		}
	};

	useEffect(() => {
		getFormDependencies();
		if (editSubscriptions?.id) isEditMod.onTrue();
	}, [editSubscriptions]);

	const onSubmit = async ({ id, ...data }: IStateForm) => {
		try {
			let response = {};
			
			if (isEditMod.value)
				response = await subscriptionRepository.update({
					id,
					...data,
				});
			else {
				const hasUserRegister = await subscriptionRepository.getByUserId(data.user_id ?? "")
				
				if (hasUserRegister.data) {
					enqueueSnackbar('O usuário já possui uma assinatura cadastrada', { variant: 'error' });
					return
				} else response = await subscriptionRepository.create({
					...data,
					status: 'Ativo',
				});
			}
				
			if (response) {
				enqueueSnackbar(
					isEditMod.value
						? 'Assinatura editada com Sucesso!'
						: 'Assinatura cadastrada com Sucesso!',
					{ variant: 'success' },
				);
				router.push(Routes.subscription);
			} else
				enqueueSnackbar(
					isEditMod.value
						? 'Erro ao editar a Assinatura!'
						: 'Erro ao cadastrar a Assinatura!',
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
								? 'Edição de Assinatura'
								: 'Registro de Assinatura'}
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
						{' '}
						<Stack
							display='grid'
							width='100%'
							gap={3}
							gridTemplateColumns={{
								xs: 'repeat(1, 1fr)',
								sm: 'repeat(2, 1fr)',
							}}
						>
							<RHFSelect
								sx={{ width: '100%' }}
								fullWidth
								name='user_id'
								label='Usuário'
							>
								{users.map(({ name, id }) => (
									<MenuItem key={id} value={id}>
										{name}
									</MenuItem>
								))}
							</RHFSelect>
							<RHFSelect
								sx={{ width: '100%' }}
								fullWidth
								name='recorrency'
								label='Recorrência'
							>
								{['Mensal', 'Anual'].map((item) => (
									<MenuItem key={item} value={item}>
										{item}
									</MenuItem>
								))}
							</RHFSelect>
							<RHFTextField
								sx={{ width: '100%' }}
								fullWidth
								name='cost'
								label='Custo (R$)'
								type='number'
							/>
							{isEditMod.value && (
								<RHFSelect
									sx={{ width: '100%' }}
									fullWidth
									name='status'
									label='Status'
								>
									{['Ativo', 'Inativo'].map((item) => (
										<MenuItem key={item} value={item}>
											{item}
										</MenuItem>
									))}
								</RHFSelect>
							)}
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
									: 'Cadastrar Assinatura'}
							</LoadingButton>
						</Stack>
					</Box>
				</Card>
			</FormProvider>
		</Box>
	);
};
