import { LoadingButton } from '@mui/lab';
import {
	MenuItem,
	TableCell,
	TableRow as TableRowDefault,
	Tooltip,
	Typography,
	Zoom,
} from '@mui/material';
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
	const isLoading = useBoolean(false);

	const handleDeleteRow = () => {
		isLoading.onTrue();
		onDeleteRow();
	};

	const handleEditRow = () => {
		isLoading.onTrue();
		onEditRow();
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
				{row?.user?.name || notFound}
			</TableCell>

			<Typography variant='body2' gutterBottom>
				{typeof row?.cost === 'number'
					? `R$ ${row?.cost.toFixed(2)}`
					: 'Não informado'}
			</Typography>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.recorrency
					? `${
							{
								MONTHLY: 'MENSAL',
								QUARTERLY: 'TRIMESTRAL',
								YEARLY: 'ANUAL',
							}[
								//@ts-ignore
								row.recorrency
							]
						}`
					: 'Não informado'}
			</TableCell>

			<Typography sx={{ whiteSpace: 'nowrap' }}>
				{
					{
						ACTIVE: 'Ativo',
						INACTIVE: 'Inativo',
					}[
						//@ts-ignore
						row.status
					]
				}
			</Typography>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{(row?.created_at &&
					new Date(row?.created_at).toLocaleDateString('pt-BR')) ||
					notFound}
			</TableCell>

			<CustomPopover
				open={popover.open}
				onClose={popover.onClose}
				arrow='right-top'
				sx={{ width: 140 }}
			>
				<MenuItem
					onClick={() => {
						handleEditRow();
						popover.onClose();
					}}
				>
					<Iconify icon='solar:pen-bold' />
					Editar
				</MenuItem>
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
			</CustomPopover>

			<ConfirmDialog
				open={isOpenDialogDeleteUser.value}
				onClose={isOpenDialogDeleteUser.onFalse}
				title='Excluir Assinatura'
				content={
					<>
						<p>Tem certeza que você deseja excluir a assinatura:</p>
						<li>
							Data:{' '}
							<strong>
								{row?.created_at &&
									new Date(
										row?.created_at,
									).toLocaleDateString('pt-BR')}
							</strong>
						</li>
						<li>
							Usuário: <strong>{row?.user?.name}</strong>
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
		</TableRowDefault>
	);
};
