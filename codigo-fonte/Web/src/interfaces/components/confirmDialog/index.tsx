import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Icon } from '../icon';
import { DialogClose, DialogDescription, DialogHeader } from './styled';
import { ConfirmDialogProps } from './types';

export const ConfirmDialog = ({
	title,
	content,
	action,
	viewCancelButton = true,
	textCancelButton,
	subDescription,
	open,
	onClose,
	...other
}: ConfirmDialogProps) => {
	return (
		<Dialog
			fullWidth
			maxWidth='xs'
			open={open}
			onClose={onClose}
			{...other}
		>
			<DialogHeader>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{subDescription}</DialogDescription>
				<DialogClose>
					<Icon
						icon='close'
						type='solid'
						color='#ffffff'
						cursor='pointer'
						size='1.25x'
						onClick={onClose}
					/>
				</DialogClose>
			</DialogHeader>

			{content && (
				<DialogContent sx={{ typography: 'body2' }}>
					{' '}
					{content}{' '}
				</DialogContent>
			)}

			<DialogActions>
				{viewCancelButton && (
					<Button
						variant='outlined'
						color='inherit'
						onClick={onClose}
					>
						{textCancelButton || 'Cancelar'}
					</Button>
				)}
				{action}
			</DialogActions>
		</Dialog>
	);
};
