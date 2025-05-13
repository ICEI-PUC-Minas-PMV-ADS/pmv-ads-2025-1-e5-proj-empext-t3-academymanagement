'use client';

import { Box, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStatusRepository } from '../../../../infrastructure/repositories/status';
import AppAreaInstalled from '../../../components/graph';
import { useFrequencyChart } from '../../../hooks/useChart/useFrequencyChart';
import { TableToolbar } from './components/tableToolbar';

export const FrequencyChart = () => {
	const statusRepository = useStatusRepository();
	const [userId, setUserId] = useState<string | null>(null);

	const {
		isLoading: isLoadingFrequency,
		fetchData: fetchDataFrequency,
		chartData: chartDataFrequency,
	} = useFrequencyChart(
		'Frequências',
		statusRepository.studentAttendance,
		'attendance',
		userId,
	);

	useEffect(() => {
		if (userId) {
			fetchDataFrequency();
		}
	}, [userId]);

	return (
		<Card sx={{ width: '80%' }}>
			<Box>
				<TableToolbar setUserId={setUserId} />
				<AppAreaInstalled
					title='Frequências'
					subheader='Gráfico indicativo de frequências'
					currentDateTxt='Diário'
					chart={chartDataFrequency}
					loading={isLoadingFrequency.value}
				/>
			</Box>
		</Card>
	);
};
