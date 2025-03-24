import Box, { BoxProps } from '@mui/material/Box';

import { LoadingIcon } from '../icon';

export const LoadingScreen = ({ sx, ...other }: BoxProps) => {
	return (
		<Box
			sx={{
				right: 0,
				width: 1,
				bottom: 0,
				height: 1,
				zIndex: 9998,
				display: 'flex',
				position: 'fixed',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				...sx,
			}}
			{...other}
		>
			<LoadingIcon />
		</Box>
	);
};
