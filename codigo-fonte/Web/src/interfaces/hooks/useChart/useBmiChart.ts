import { useCallback, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { IGraphProps } from '../../components/graph/interfaces';
import { useBoolean } from '../useBoolean';
import { IBmiProgress } from '../../../domain/entities/IStatusEntity';

export const useBmiChart = (
	name: string,
	fetch: any,
	userId: string | null,
) => {
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
							let total = 0;
							response?.bmi?.items
								?.filter(
									(item: IBmiProgress) => item.date === cat,
								)
								.forEach((item: IBmiProgress) => {
									total += item.bmi || 0;
								});
							return total.toFixed(2);
						}) || [],
				},
				{
					name: 'Peso',
					data:
						categories?.map((cat: string) => {
							let total = 0;
							response?.bmi?.items
								?.filter(
									(item: IBmiProgress) => item.date === cat,
								)
								.forEach((item: IBmiProgress) => {
									total += item.weight || 0;
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
