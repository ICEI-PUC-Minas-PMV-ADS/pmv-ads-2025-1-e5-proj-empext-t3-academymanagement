'use client';

import { Alert, Box, Card, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useStatusRepository } from '../../../../infrastructure/repositories/status';
import AppAreaInstalled from '../../../components/graph';
import { useFinancialChart } from '../../../hooks/useChart/useFinanceChart';
import { useStatusCount } from '../../../hooks/useStatusCount';
import { Tiles } from './components/tiles';
import { DASHBOARD_TILES } from './constants';
import { styles } from './styles';

export const DashboardGrid = () => {
	const statusRepository = useStatusRepository();
	const {
		data: countTile,
		isLoading,
		error,
		fetchStatusCount,
	} = useStatusCount();

	const {
		isLoading: isLoadingFinancial,
		fetchData: fetchDataFinancial,
		chartData: chartDataFinancial,
	} = useFinancialChart('Financas', statusRepository.financialManagement);

	useEffect(() => {
		fetchStatusCount();
	}, [fetchStatusCount]);

	useEffect(() => {
		fetchDataFinancial();
	}, []);

	useEffect(() => console.log(chartDataFinancial), [chartDataFinancial]);
	if (isLoading.value) {
		return (
			<Box display='flex' justifyContent='center'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box>
				<Alert severity='error'>{error.message}</Alert>
			</Box>
		);
	}

	return (
		<>
			<Box sx={styles.tilesContainer}>
				<Tiles
					tiles={[
						{
							name: DASHBOARD_TILES.USERS,
							value: countTile.user.toString(),
						},
						{
							name: DASHBOARD_TILES.FREQUENCIES,
							value: countTile.frequency.toString(),
						},
						{
							name: DASHBOARD_TILES.SUBSCRIPTIONS,
							value: countTile.subscription.toString(),
						},
						{
							name: DASHBOARD_TILES.CLASSES,
							value: countTile.classe.toString(),
						},
					]}
				/>
			</Box>
			<Card sx={{ width: '80%', overflow: 'auto' }}>
				<Box>
					<AppAreaInstalled
						title='Finanças'
						subheader='Gráfico indicativo de finanças'
						currentDateTxt='Diário'
						chart={chartDataFinancial}
						loading={isLoadingFinancial.value}
					/>
				</Box>
			</Card>
		</>
	);
};
