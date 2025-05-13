'use client';

import { Box, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStatusRepository } from '../../../../infrastructure/repositories/status';
import AppAreaInstalled from '../../../components/graph';
import { useBmiChart } from '../../../hooks/useChart/useBmiChart';
import { TableToolbar } from './components/tableToolbar';

export const BmiChart = () => {
	const statusRepository = useStatusRepository();
	const [userId, setUserId] = useState<string | null>(null);

	const {
		isLoading: isLoadingBmi,
		fetchData: fetchDataBmi,
		chartData: chartDataBmi,
	} = useBmiChart(
		'Indice de Massa Corporal',
		statusRepository.bmiProgress,
		userId,
	);

	useEffect(() => {
		if (userId) {
			fetchDataBmi();
		}
	}, [userId]);

	return (
		<Card sx={{ width: '80%' }}>
			<TableToolbar setUserId={setUserId} />
			<Box>
				<AppAreaInstalled
					title='Indice de Massa Corporal'
					subheader='Gráfico indicativo de Indice de Massa Corporal'
					currentDateTxt='Diário'
					chart={chartDataBmi}
					loading={isLoadingBmi.value}
				/>
			</Box>
		</Card>
	);
};
