import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHeadDefault from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { SxProps, Theme } from '@mui/material/styles';

const visuallyHidden = {
	border: 0,
	margin: -1,
	padding: 0,
	width: '1px',
	height: '1px',
	overflow: 'hidden',
	position: 'absolute',
	whiteSpace: 'nowrap',
	clip: 'rect(0 0 0 0)',
} as const;

type Props = {
	order?: 'asc' | 'desc';
	orderBy?: string;
	headLabel: any[];
	rowCount?: number;
	numSelected?: number;
	onSort?: (id: string) => void;
	onSelectAllRows?: (checked: boolean) => void;
	sx?: SxProps<Theme>;
};

export default function TableHead({
	order,
	orderBy,
	rowCount = 0,
	headLabel,
	numSelected = 0,
	onSort,
	onSelectAllRows,
	sx,
}: Props) {
	return (
		<TableHeadDefault sx={sx}>
			<TableRow>
				{onSelectAllRows && <TableCell padding='checkbox' />}

				{headLabel.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.align || 'left'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{ width: headCell.width, minWidth: headCell.width }}
					>
						{onSort ? (
							<TableSortLabel
								hideSortIcon
								active={orderBy === headCell.id}
								direction={
									orderBy === headCell.id ? order : 'asc'
								}
								onClick={() => onSort(headCell.id)}
							>
								<strong style={{ fontSize: '.95rem' }}>
									{headCell.label}
								</strong>

								{orderBy === headCell.id ? (
									<Box sx={{ ...visuallyHidden }}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						) : (
							headCell.label
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHeadDefault>
	);
}
