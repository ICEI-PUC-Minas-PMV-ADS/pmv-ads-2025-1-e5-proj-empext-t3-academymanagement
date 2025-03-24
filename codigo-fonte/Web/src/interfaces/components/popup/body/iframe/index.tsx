import { Box, DialogContent } from '@mui/material';
import { IPopupIframeProps } from './interfaces';

export const PopupBodyIframe = ({ frameURL, title, sx }: IPopupIframeProps) => {
	return (
		<DialogContent
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'row',
				padding: 0,
				gap: '32px',
				flex: 1,
			}}
		>
			<Box
				component='iframe'
				src={frameURL}
				style={{
					padding: 0,
					margin: 0,
					border: 'none',
					borderRadius: 'none',
					...sx,
				}}
				width='100%'
				title={title}
			/>
		</DialogContent>
	);
};
