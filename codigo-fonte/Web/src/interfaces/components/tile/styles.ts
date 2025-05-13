import { SxProps, Theme } from '@mui/material';

export const styles = {
	root: (theme: Theme): SxProps<Theme> => ({
		'width': 'auto',
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'center',
		'flexDirection': 'column',
		'gap': '5px',
		'transition': 'all 0.4s ease',
		'borderRadius': '5%',
		'cursor': 'pointer',
		'background': theme.palette.background.neutral,
		'&:hover': {
			'backgroundColor': theme.palette.grey[700],
			'& *': {
				color: theme.palette.grey[100],
			},
		},
	}),
};
