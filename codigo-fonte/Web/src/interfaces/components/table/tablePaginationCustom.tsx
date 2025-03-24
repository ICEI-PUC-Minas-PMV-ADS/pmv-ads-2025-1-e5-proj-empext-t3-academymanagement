import Box from '@mui/material/Box';
import TablePagination, {
	TablePaginationProps,
} from '@mui/material/TablePagination';
import { SxProps, Theme } from '@mui/material/styles';

type Props = {
	dense?: boolean;
	sx?: SxProps<Theme>;
};

export default function TablePaginationCustom({
	dense,
	rowsPerPageOptions = [5, 10, 25],
	sx,
	...other
}: Props & TablePaginationProps) {
	return (
		<Box sx={{ position: 'relative', ...sx }}>
			<TablePagination
				rowsPerPageOptions={rowsPerPageOptions}
				labelRowsPerPage='Linhas por página'
				component='div'
				{...other}
				sx={{
					borderTopColor: 'transparent',
				}}
			/>
		</Box>
	);
}
