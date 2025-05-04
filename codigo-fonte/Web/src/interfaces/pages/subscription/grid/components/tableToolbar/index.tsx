import { LoadingButton } from '@mui/lab';
import { InputAdornment, Stack, TextField, Tooltip, Zoom } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Routes } from '../../../../../../app/routes';
import { Iconify } from '../../../../../components/iconify';
import { useBoolean } from '../../../../../hooks/useBoolean';
import { ITableToolbarProps } from './interfaces';

export const TableToolbar = ({ filters, onFilters }: ITableToolbarProps) => {
	const isLoading = useBoolean(false);
	const router = useRouter();

	const handleCreate = () => {
		isLoading.onTrue();
		router.replace(Routes.subscriptionCreate);
	};

	return (
		<Stack
			sx={{
				p: 3,
				display: 'flex',
				flex: 'wrap',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 2,
			}}
		>
			<Stack
				direction='row'
				alignItems='center'
				spacing={2}
				flexGrow={1}
				sx={{ width: 1 }}
			>
				<Tooltip
					TransitionComponent={Zoom}
					TransitionProps={{ timeout: 300 }}
					arrow
					disableInteractive
					title='Cadastrar Nova Assinatura'
				>
					<LoadingButton
						onClick={handleCreate}
						loading={isLoading.value}
					>
						<Iconify icon='ic:baseline-plus' width={28} />
					</LoadingButton>
				</Tooltip>
				<TextField
					sx={{ flex: 1 }}
					value={filters.search}
					onChange={(e) =>
						onFilters({
							filterKey: 'search',
							value: e.target.value,
						})
					}
					placeholder='Pesquisar...'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Iconify
									icon='eva:search-fill'
									sx={{ color: 'text.disabled' }}
								/>
							</InputAdornment>
						),
					}}
				/>
			</Stack>
		</Stack>
	);
};
