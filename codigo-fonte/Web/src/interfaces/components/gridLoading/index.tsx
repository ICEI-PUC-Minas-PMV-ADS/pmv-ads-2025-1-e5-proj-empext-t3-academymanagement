import { Skeleton, TableCell, TableRow } from '@mui/material';
import { IGridLoadingProps } from './interfaces';

export const GridLoading = ({ columns, rowsPerPage }: IGridLoadingProps) => {
	const cells = Array.from({ length: columns + 1 }, (_, i) => (
		<TableCell key={i}>
			<Skeleton />
		</TableCell>
	));

	return Array.from({ length: rowsPerPage }, (_, i) => (
		<TableRow key={i}>{cells}</TableRow>
	));
};
