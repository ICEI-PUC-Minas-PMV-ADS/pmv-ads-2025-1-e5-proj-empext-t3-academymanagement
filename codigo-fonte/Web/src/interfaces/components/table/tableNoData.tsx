import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { SxProps, Theme } from '@mui/material/styles';
import EmptyContent from '../emptyContent';

type Props = {
	notFound: boolean;
	sx?: SxProps<Theme>;
	title?: string;
};

export default function TableNoData({
	notFound,
	sx,
	title = 'Sem Dados',
}: Props) {
	return (
		<TableRow>
			{notFound ? (
				<TableCell colSpan={999}>
					<EmptyContent
						filled
						title={title}
						sx={{
							py: 10,
							...sx,
						}}
					/>
				</TableCell>
			) : (
				<TableCell colSpan={999} sx={{ p: 0 }} />
			)}
		</TableRow>
	);
}
