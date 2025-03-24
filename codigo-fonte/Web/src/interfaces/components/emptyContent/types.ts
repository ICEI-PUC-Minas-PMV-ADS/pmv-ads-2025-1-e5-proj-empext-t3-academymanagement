import { StackProps } from '@mui/material/Stack';

export interface IEmptyContentProps extends StackProps {
	title?: string;
	imgUrl?: string;
	filled?: boolean;
	description?: string;
	action?: React.ReactNode;
}
