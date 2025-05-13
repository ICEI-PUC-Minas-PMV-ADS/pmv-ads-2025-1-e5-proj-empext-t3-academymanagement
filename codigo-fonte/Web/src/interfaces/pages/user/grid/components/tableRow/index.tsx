import { LoadingButton } from '@mui/lab';
import {
	Box,
	Button,
	MenuItem,
	TableCell,
	TableRow as TableRowDefault,
	Tooltip,
	Typography,
	Zoom,
} from '@mui/material';
import { format } from 'date-fns';
import { ConfirmDialog } from '../../../../../components/confirmDialog';
import CustomPopover from '../../../../../components/customPopover';
import { Iconify } from '../../../../../components/iconify';
import { useBoolean } from '../../../../../hooks/useBoolean';
import { usePopover } from '../../../../../hooks/usePopover';
import { ITableRowProps } from './interfaces';

export const TableRow = ({
	onDeleteRow,
	onEditRow,
	row,
	selected,
}: ITableRowProps) => {
	const notFound = 'Não informado';

	const popover = usePopover();

	const isOpenDialogDeleteUser = useBoolean();
	const isOpenDialogClasses = useBoolean(false);
	const isLoading = useBoolean(false);

	const subscriptionPopover = usePopover();

	const handleEditRow = () => {
		isLoading.onTrue();
		onEditRow();
	};

	const handleDeleteRow = () => {
		isLoading.onTrue();
		onDeleteRow();
	};

	return (
		<TableRowDefault hover selected={selected}>
			{!!row && row?.id && (
				<TableCell align='right' sx={{ px: 1, whiteSpace: 'nowrap' }}>
					<Tooltip
						TransitionComponent={Zoom}
						TransitionProps={{ timeout: 300 }}
						arrow
						disableInteractive
						title='Mais Opções'
					>
						<LoadingButton
							loading={isLoading.value}
							onClick={popover.onOpen}
						>
							<Iconify icon='eva:more-vertical-fill' />
						</LoadingButton>
					</Tooltip>
				</TableCell>
			)}

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.name || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.email || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.type || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.classes && row?.classes.length ? (
					<Tooltip
						TransitionComponent={Zoom}
						TransitionProps={{ timeout: 300 }}
						arrow
						disableInteractive
						title='Ver Classes Vinculadas'
					>
						<Button
							variant='text'
							color='inherit'
							onClick={isOpenDialogClasses.onTrue}
						>
							Ver Mais
						</Button>
					</Tooltip>
				) : (
					notFound
				)}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.subscription ? (
					<>
						<Tooltip
							title='Ver detalhes da assinatura'
							arrow
							TransitionComponent={Zoom}
						>
							<Button
								variant='text'
								onClick={subscriptionPopover.onOpen}
							>
								{
									{ ACTIVE: 'Ativo', INACTIVE: 'Inativo', Ativo: 'Ativo', Inativo: 'Inativo' }[
										//@ts-ignore
										row.subscription.status
									]
								}
							</Button>
						</Tooltip>

						<CustomPopover
							open={subscriptionPopover.open}
							onClose={subscriptionPopover.onClose}
							arrow='right-top'
							sx={{ width: 260 }}
						>
							<Box sx={{ p: 1 }}>
								<Typography variant='subtitle2'>
									Status
								</Typography>
								<Typography variant='body2' gutterBottom>
									{
										{
											ACTIVE: 'Ativo',
											INACTIVE: 'Inativo',
											Ativo: 'Ativo',
											Inativo: 'Inativo'
										}[
											//@ts-ignore
											row.subscription.status
										]
									}
								</Typography>

								<Typography variant='subtitle2'>
									Custo
								</Typography>
								<Typography variant='body2' gutterBottom>
									{typeof row.subscription.cost === 'number'
										? `R$ ${row.subscription.cost.toFixed(2)} / ${
												{
													MONTHLY: 'MENSAL',
													QUARTERLY: 'TRIMESTRAL',
													YEARLY: 'ANUAL',
												}[
													//@ts-ignore
													row.subscription.recorrency
												]
											}`
										: 'Não informado'}
								</Typography>

								<Typography variant='subtitle2'>
									Criado em
								</Typography>
								<Typography variant='body2' gutterBottom>
									{row.subscription.created_at
										? format(
												new Date(
													row.subscription.created_at,
												),
												'dd/MM/yyyy HH:mm',
											)
										: 'Não informado'}
								</Typography>

								<Typography variant='subtitle2'>
									Última atualização
								</Typography>
								<Typography variant='body2'>
									{row.subscription.updated_at
										? format(
												new Date(
													row.subscription.updated_at,
												),
												'dd/MM/yyyy HH:mm',
											)
										: 'Não informado'}
								</Typography>
							</Box>
						</CustomPopover>
					</>
				) : (
					notFound
				)}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.created_at
					? format(new Date(row?.created_at), 'dd/MM/yyyy HH:mm')
					: 'Não informado'}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.updated_at
					? format(new Date(row?.updated_at), 'dd/MM/yyyy HH:mm')
					: 'Não informado'}
			</TableCell>

			<CustomPopover
				open={popover.open}
				onClose={popover.onClose}
				arrow='right-top'
				sx={{ width: 140 }}
			>
				<MenuItem
					onClick={() => {
						isOpenDialogDeleteUser.onTrue();
						popover.onClose();
					}}
					sx={{ color: 'error.main' }}
				>
					<Iconify icon='solar:trash-bin-trash-bold' />
					Excluir
				</MenuItem>

				<MenuItem
					onClick={() => {
						handleEditRow();
						popover.onClose();
					}}
				>
					<Iconify icon='solar:pen-bold' />
					Editar
				</MenuItem>
			</CustomPopover>

			<ConfirmDialog
				open={isOpenDialogDeleteUser.value}
				onClose={isOpenDialogDeleteUser.onFalse}
				title='Excluir Usuário'
				content={
					<>
						<p>Tem certeza que você deseja excluir o usuário:</p>
						<li>
							<strong>{row?.name}</strong>
						</li>
					</>
				}
				action={
					<LoadingButton
						loading={isLoading.value}
						variant='contained'
						color='error'
						onClick={handleDeleteRow}
					>
						Excluir
					</LoadingButton>
				}
			/>

			<ConfirmDialog
				open={isOpenDialogClasses.value}
				onClose={isOpenDialogClasses.onFalse}
				title='Classes de Aula'
				content={
					row?.classes ? (
						<Box
							component='ul'
							sx={{
								'maxHeight': 150,
								'overflowY': 'auto',
								'p': 0,
								'm': 0,
								'listStyle': 'none',
								'scrollbarWidth': 'thin',
								'scrollbarColor':
									'rgba(128,128,128,0.8) transparent',
								'&::-webkit-scrollbar': {
									width: 6,
								},
								'&::-webkit-scrollbar-track': {
									background: 'transparent',
								},
								'&::-webkit-scrollbar-thumb': {
									backgroundColor: 'rgba(128,128,128,0.8)',
									borderRadius: 3,
								},
							}}
						>
							{row?.classes?.map((data) => (
								<li key={data.user_id}>
									<strong>{data?.classe.name}</strong>
								</li>
							))}
						</Box>
					) : (
						'Não informado'
					)
				}
				action={<></>}
			/>
		</TableRowDefault>
	);
};
