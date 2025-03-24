import { DialogContent } from '@mui/material';
import { IPopupChildrenProps } from './interfaces';

export const PopupBodyChildren = ({ children, sx }: IPopupChildrenProps) => {
	return (
		<DialogContent
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'row',
				gap: '32px',
				flex: 1,
				...sx,
			}}
		>
			{children}
		</DialogContent>
	);
};
