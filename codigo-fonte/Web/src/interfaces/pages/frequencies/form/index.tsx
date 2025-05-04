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
import { useFrequencyRepository } from '../../../../infrastructure/repositories/frequency';
import { FormProvider } from '../../../components/hookForm';
import { useBoolean } from '../../../hooks/useBoolean';
import { IStateForm } from './types/defaultStateForm';
import { IFormProps } from './types/formProps';
import { generateDefaultValues } from './utils/defaultValues';
import { FrequenciesSchema } from './validators/schema';
import RHFSelect, {
	RHFMultiSelect,
} from '../../../components/hookForm/rhf-select';
import { IUserEntity } from '../../../../domain/entities/IUserEntity';
import { useUserRepository } from '../../../../infrastructure/repositories/user';

export const FrequenciesForm = ({ editFrequencies }: IFormProps) => {
	const router = useRouter();
	const isEditMod = useBoolean(false);

	const frequencyRepository = useFrequencyRepository();
	const userRepository = useUserRepository();
	const [users, setUsers] = useState<IUserEntity[]>([]);

	const defaultValues = useMemo(
		() => generateDefaultValues(editFrequencies),
		[editFrequencies],
	);

	const formContext = useForm({
		resolver: yupResolver(FrequenciesSchema(isEditMod.value)),
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
		if (editFrequencies?.id) isEditMod.onTrue();
	}, [editFrequencies]);

	const onSubmit = async ({ id, ...data }: IStateForm) => {
		try {
			let response = {};

			response = await frequencyRepository.create(data);

			if (response) {
				enqueueSnackbar('Frequência cadastrada com Sucesso!');
				router.push(Routes.frequencies);
			} else
				enqueueSnackbar(
					isEditMod.value
						? 'Erro ao editar a Frequência!'
						: 'Erro ao cadastrar a Frequência!',
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
								? 'Edição de Frequência'
								: 'Registro de Frequência'}
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
						<RHFSelect
							sx={{ width: '100%' }}
							fullWidth
							name='user_id'
							label='Usuário'
						>
							{users.map(({ name, id }) => (
								<MenuItem
									//@ts-ignore
									key={id}
									value={id}
								>
									{name}
								</MenuItem>
							))}
						</RHFSelect>
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
									: 'Cadastrar Frequência'}
							</LoadingButton>
						</Stack>
					</Box>
				</Card>
			</FormProvider>
		</Box>
	);
};
