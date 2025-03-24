import { DialogProps } from '@mui/material/Dialog';

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
	title: React.ReactNode;
	subDescription?: string;
	content?: React.ReactNode;
	action: React.ReactNode;
	viewCancelButton?: boolean;
	onClose: VoidFunction;
	textCancelButton?: string;
};
