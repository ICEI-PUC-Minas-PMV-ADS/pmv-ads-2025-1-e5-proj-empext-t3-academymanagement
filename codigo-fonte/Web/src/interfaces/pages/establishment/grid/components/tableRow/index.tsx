import { LoadingButton } from '@mui/lab';
import {
	MenuItem,
	TableCell,
	TableRow as TableRowDefault,
	Tooltip,
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

	const isOpenDialogDeleteEstablishment = useBoolean();
	const isLoading = useBoolean(false);

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
				{row?.id || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.name || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.accommodation_type || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.max_capacity || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.privacy_level || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.has_balcony || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.company_id || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.created_at || notFound}
			</TableCell>

			<TableCell sx={{ whiteSpace: 'nowrap' }}>
				{row?.updated_at || notFound}
			</TableCell>

			<CustomPopover
				open={popover.open}
				onClose={popover.onClose}
				arrow='right-top'
				sx={{ width: 140 }}
			>
				<MenuItem
					onClick={() => {
						isOpenDialogDeleteEstablishment.onTrue();
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
				open={isOpenDialogDeleteEstablishment.value}
				onClose={isOpenDialogDeleteEstablishment.onFalse}
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
		</TableRowDefault>
	);
};
