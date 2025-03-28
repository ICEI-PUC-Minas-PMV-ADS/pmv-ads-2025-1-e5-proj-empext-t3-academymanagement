import { alpha, styled } from '@mui/material/styles';
import { MaterialDesignContent } from 'notistack';

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
	return {
		'& #notistack-snackbar': {
			...theme.typography.subtitle2,
			padding: 0,
			flexGrow: 1,
			fontSize: '1rem',
			flexWrap: 'wrap',
			justifyContent: 'center',
			textAlign: 'center',
			gap: '10px',
		},
		'&.notistack-MuiContent': {
			paddingRight: theme.spacing(2),
			color: theme.palette.text.primary,
			flexWrap: 'wrap-reverse',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: theme.palette.background.paper,
		},
		'&.notistack-MuiContent-default': {
			padding: theme.spacing(1),
			color: theme.palette.grey[800],
			backgroundColor: theme.palette.common.white,
		},
	};
});

type StyledIconProps = {
	color: 'info' | 'success' | 'warning' | 'error';
};

export const StyledIcon = styled('span')<StyledIconProps>(
	({ color, theme }) => ({
		width: 44,
		height: 44,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: theme.spacing(1.5),
		color: theme.palette[color].main,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette[color].main, 0.16),
	}),
);
