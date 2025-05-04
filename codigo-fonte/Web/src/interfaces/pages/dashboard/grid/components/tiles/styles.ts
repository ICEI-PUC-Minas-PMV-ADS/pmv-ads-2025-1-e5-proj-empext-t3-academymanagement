import { SxProps, Theme } from '@mui/material';

export const styles = {
	tileContainer: {
		width: '200px',
		height: '75px',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '5%',
		m: 2,
	},
	valueText: {
		fontSize: '1.8rem',
	},
} satisfies Record<string, SxProps<Theme>>;
