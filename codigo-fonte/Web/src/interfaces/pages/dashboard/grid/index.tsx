'use client';

import { Box, CircularProgress, Alert } from '@mui/material';
import { Tiles } from './components/tiles';
import { useEffect } from 'react';
import { styles } from './styles';
import { DASHBOARD_TILES } from './constants';
import { useStatusCount } from '../../../hooks/useStatusCount';

export const DashboardGrid = () => {
	const {
		data: countTile,
		isLoading,
		error,
		fetchStatusCount,
	} = useStatusCount();

	useEffect(() => {
		fetchStatusCount();
	}, [fetchStatusCount]);

	if (isLoading) {
		return (
			<Box sx={styles.container} display='flex' justifyContent='center'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={styles.container}>
				<Alert severity='error'>{error.message}</Alert>
			</Box>
		);
	}

	return (
		<Box sx={styles.container}>
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
		</Box>
	);
};
