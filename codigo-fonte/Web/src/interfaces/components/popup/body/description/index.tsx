import { DialogContent, Typography } from '@mui/material';
import { IPopupDescriptionProps } from './interfaces';

export const PopupBodyDescription = ({
	description,
	sx,
}: IPopupDescriptionProps) => {
	return (
		<DialogContent
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'row',
				gap: '32px',
				flex: 1,
			}}
		>
			<Typography sx={{ fontSize: '.8rem', ...sx }}>
				{description}
			</Typography>
		</DialogContent>
	);
};
