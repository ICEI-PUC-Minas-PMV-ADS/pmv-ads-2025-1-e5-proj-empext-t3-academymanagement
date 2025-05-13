'use client';
import dynamic from 'next/dynamic';

interface LineChartProps {
	categories?: string[];
	seriesData: { name: string; data: number[] }[];
	height?: number;
}

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

export function LineChart({
	categories,
	seriesData,
	height = 300,
}: LineChartProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'line-chart',
			toolbar: { show: false },
			zoom: { enabled: false },
		},
		xaxis: {
			categories,
			labels: {
				style: {
					colors: '#e5e7eb',
				},
			},
			title: { text: 'Período', style: { color: '#e5e7eb' } },
		},
		yaxis: {
			labels: {
				style: {
					colors: '#e5e7eb',
				},
				formatter: (value: number) => {
					return seriesData[0]?.name === 'Financas'
						? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
						: value.toString();
				},
			},
			title: { text: 'Valores', style: { color: '#e5e7eb' } },
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		dataLabels: { enabled: false },
		tooltip: { enabled: true, theme: 'dark' },
		grid: {
			show: false,
		},
		colors: ['#77B6EA', '#545454'],
	};

	return (
		<div>
			<ReactApexChart
				options={options}
				series={seriesData.map(({ name, data }) => ({
					name,
					data,
				}))}
				type='line'
				height={height}
			/>
		</div>
	);
}
