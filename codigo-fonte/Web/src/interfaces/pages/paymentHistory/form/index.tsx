'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, MenuItem, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Routes } from '../../../../app/routes';
import { FormProvider, RHFTextField } from '../../../components/hookForm';
import { useBoolean } from '../../../hooks/useBoolean';
import { IStateForm } from './types/defaultStateForm';
import { IFormProps } from './types/formProps';
import { generateDefaultValues } from './utils/defaultValues';
import { PaymentHistorySchema } from './validators/schema';
import RHFSelect from '../../../components/hookForm/rhf-select';
import { usePaymentHistoryRepository } from '../../../../infrastructure/repositories/paymentHistory';
import { useUserRepository } from '../../../../infrastructure/repositories/user';
import { IUserEntity } from '../../../../domain/entities/IUserEntity';
import { useSubscriptionRepository } from '../../../../infrastructure/repositories/subscription';
import { ISubscriptionEntity } from '../../../../domain/entities/ISubscriptionEntity';

export const PaymentHistoryForm = ({ editPaymentHistory }: IFormProps) => {
	const router = useRouter();
	const isEditMod = useBoolean(false);

	const paymentHistoryRepository = usePaymentHistoryRepository();
	const userRepository = useUserRepository();
	const subscriptionRepository = useSubscriptionRepository();
	const [users, setUsers] = useState<IUserEntity[]>([]);

	const defaultValues = useMemo(
		() => generateDefaultValues(editPaymentHistory),
		[editPaymentHistory],
	);

	const formContext = useForm({
		resolver: yupResolver(PaymentHistorySchema(isEditMod.value)),
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
		if (editPaymentHistory?.id) isEditMod.onTrue();
	}, [editPaymentHistory]);

	const onSubmit = async ({ id, ...data }: IStateForm) => {
		try {
			let response = {};

			const subscription =
				data.user_id &&
				(await subscriptionRepository.getByUserId(data.user_id))?.data;

			if (!subscription) {
				enqueueSnackbar('Assinatura não encontrada!', {
					variant: 'error',
				});

				return;
			}

			if (isEditMod.value)
				response = await paymentHistoryRepository.update({
					id,
					cost: data.cost,
					observation: data.observation,
				});
			else
				response = await paymentHistoryRepository.create({
					subscription_id: subscription.id,
					cost: data.cost,
					observation: data.observation,
				});

			if (response) {
				enqueueSnackbar(
					isEditMod.value
						? 'Histórico de Pagamento editado com sucesso!'
						: 'Histórico de Pagamento cadastrado com sucesso!',
				);
				router.push(Routes.paymentHistory);
			} else
				enqueueSnackbar(
					isEditMod.value
						? 'Erro ao editar o Histórico de Pagamento!'
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
								? 'Edição de Histórico de Pagamento'
								: 'Registro de Histórico de Pagamento'}
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
							<RHFSelect
								disabled={isEditMod.value}
								sx={{ width: '100%' }}
								fullWidth
								name='user_id'
								label='Usuário'
							>
								{users.map(({ id, name }) => (
									<MenuItem key={id} value={id}>
										{name}
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
						</Stack>{' '}
						<Stack
							display='grid'
							width='100%'
							gap={3}
							sx={{
								pt: 2,
							}}
							gridTemplateColumns={{
								xs: 'repeat(1, 1fr)',
								sm: 'repeat(1, 1fr)',
							}}
						>
							<RHFTextField
								sx={{ width: '100%' }}
								fullWidth
								name='observation'
								label='Observação'
								type='text'
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
									: 'Cadastrar Histórico de Pagamento'}
							</LoadingButton>
						</Stack>
					</Box>
				</Card>
			</FormProvider>
		</Box>
	);
};
