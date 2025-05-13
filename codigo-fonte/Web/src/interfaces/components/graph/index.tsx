import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { LineChart } from './chart';
import { IGraphProps } from './interfaces';

export default function AppAreaInstalled({
	title,
	subheader,
	chart,
	currentDateTxt,
	loading,
	...other
}: IGraphProps) {
	return (
		<Card {...other} sx={{ borderRadius: 0 }}>
			{title && (
				<CardHeader
					title={title}
					subheader={subheader}
					action={
						<div
							style={{
								backgroundColor: '#00000020',
								padding: '8px 18px',
							}}
						>
							<Typography variant='subtitle2'>
								{currentDateTxt}
							</Typography>
						</div>
					}
				/>
			)}

			<Box key={'item.year'} sx={{ mt: 3, mx: 3 }}>
				{loading ? (
					<Skeleton
						sx={{
							borderRadius: 2,
							width: '100%',
							height: 300,
							mb: 3,
						}}
						variant='rectangular'
					/>
				) : (
					<LineChart
						key={chart?.series[0]?.name}
						categories={chart?.categories}
						seriesData={chart?.series}
					/>
				)}
			</Box>
		</Card>
	);
}
