import { useCallback, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { IGraphProps } from '../../components/graph/interfaces';
import { useBoolean } from '../useBoolean';

export const useFrequencyChart = (name: string, fetch: any, column: string, userId?: string | null) => {
	const [chartData, setChartData] = useState<IGraphProps['chart']>({
		categories: [],
		series: [],
	});

	const isLoading = useBoolean(false);

	const fetchData = useCallback(async () => {
		try {
			isLoading.onTrue();

			const response = (await fetch(userId)).data;

			const categories = response?.categories;
			const series = [
				{
					name: name,
					data:
						categories?.map((cat: string) => {
							return (
								response?.[column]?.items?.filter(
									(item: any) => item.date === cat,
								).length || 0
							);
						}) || [],
				},
			];

			setChartData({
				categories: categories.map((cat: string) =>
					new Date(cat).toLocaleDateString('pt-BR'),
				),
				series,
			});
			isLoading.onFalse();
		} catch (error) {
			enqueueSnackbar('Erro ao carregar dados do gráfico de:' + name, {
				variant: 'error',
			});
		} finally {
			isLoading.onFalse();
		}
	}, [isLoading]);

	return { isLoading, fetchData, chartData };
};
