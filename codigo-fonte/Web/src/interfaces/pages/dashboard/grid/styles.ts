import { SxProps } from '@mui/material';

export const styles = {
	container: {
		width: '70vw',
	},
	tilesContainer: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
} satisfies Record<string, SxProps>;
