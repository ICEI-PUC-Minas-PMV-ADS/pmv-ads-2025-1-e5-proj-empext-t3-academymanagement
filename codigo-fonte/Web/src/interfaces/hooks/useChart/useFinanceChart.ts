import { enqueueSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { IFinance } from '../../../domain/entities/IStatusEntity';
import { IGraphProps } from '../../components/graph/interfaces';
import { useBoolean } from '../useBoolean';

export const useFinancialChart = (name: string, fetch: any) => {
	const [chartData, setChartData] = useState<IGraphProps['chart']>({
		categories: [],
		series: [],
	});

	const isLoading = useBoolean(false);

	const fetchData = useCallback(async () => {
		try {
			isLoading.onTrue();

			const response = (await fetch()).data;

			const categories = response?.categories;

			const series = [
				{
					name: name,
					data:
						categories?.map((cat: string) => {
							let total = 0;
							response?.financial?.items
								?.filter((item: IFinance) => item.date === cat)
								.forEach((item: IFinance) => {
									total += item.cost || 0;
								});
							return total.toFixed(2);
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
