import { CardProps } from '@mui/material/Card';
import { ApexOptions } from 'apexcharts';

export interface IGraphProps extends CardProps {
	title?: string;
	subheader?: string;
	currentDateTxt?: string;
	loading: boolean;
	chart: {
		categories?: string[];
		colors?: string[][];
		series: {
			name: string;
			data: number[];
		}[];
		options?: ApexOptions;
	};
}
