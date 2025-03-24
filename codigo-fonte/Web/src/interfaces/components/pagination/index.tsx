import Box from '@mui/material/Box';
import TablePagination, {
	TablePaginationProps,
} from '@mui/material/TablePagination';
import { IPaginationProps } from './interface';

export const Pagination = ({
	rowsPerPageOptions = [5, 10, 25],
	sx,
	...other
}: IPaginationProps & TablePaginationProps) => {
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
};
