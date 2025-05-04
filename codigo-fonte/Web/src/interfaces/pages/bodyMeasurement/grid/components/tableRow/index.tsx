import { LoadingButton } from '@mui/lab';
import {
	MenuItem,
	TableCell,
	TableRow as TableRowDefault,
	Tooltip,
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
	const isOpenDialogDelete = useBoolean();
	const isLoading = useBoolean(false);

	const handleEditRow = () => {
		isLoading.onTrue();
		onEditRow();
	};

	const handleDeleteRow = () => {
		isLoading.onTrue();
		onDeleteRow();
	};

	const formatDate = (date?: string) =>
		date ? format(new Date(date), 'dd/MM/yyyy HH:mm') : notFound;

	return (
		<TableRowDefault hover selected={selected}>
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

			<TableCell>{row?.user?.name ?? notFound}</TableCell>
			<TableCell>{row?.weight ?? notFound}</TableCell>
			<TableCell>{row?.waist ?? notFound}</TableCell>
			<TableCell>{row?.hip ?? notFound}</TableCell>
			<TableCell>{row?.body_fat ?? notFound}</TableCell>
			<TableCell>{row?.bmi ?? notFound}</TableCell>
			<TableCell>{formatDate(row?.created_at)}</TableCell>
			<TableCell>{formatDate(row?.updated_at)}</TableCell>

			<CustomPopover
				open={popover.open}
				onClose={popover.onClose}
				arrow='right-top'
				sx={{ width: 140 }}
			>
				<MenuItem
					onClick={() => {
						isOpenDialogDelete.onTrue();
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
				open={isOpenDialogDelete.value}
				onClose={isOpenDialogDelete.onFalse}
				title='Excluir Medida Corporal'
				content={
					<>
						<p>Tem certeza que deseja excluir a medição?</p>
						<li>
							ID: <strong>{row?.id || 'Sem ID'}</strong>
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
