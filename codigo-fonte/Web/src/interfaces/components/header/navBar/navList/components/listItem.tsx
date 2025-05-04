import {
	alpha,
	ListItem,
	ListItemButton,
	ListItemText,
	useTheme,
} from '@mui/material';
import { Icon } from '../../../../icon';
import { INavBarListItemProps } from '../types';

export const NavBarListItem = ({
	item,
	activeRoute,
	handleNavigate,
}: INavBarListItemProps) => {
	const theme = useTheme();

	return (
		<ListItem
			key={item.title}
			disablePadding
			sx={{
				'boxShadow': '0px 0px 3px 1px #00000030',
				'background': theme.palette.background.home,
				'border':
					activeRoute === item.route
						? `solid 2px ${theme.palette.text.secondary}`
						: `solid 2px ${theme.palette.background.home}`,
				'transition': 'all .3s',
				'color':
					activeRoute === item.route
						? theme.palette.text.primary
						: theme.palette.text.secondary,
				'fontWeight': 'bold',
				'borderRadius': '10px',
				':hover': {
					border: `solid 2px ${theme.palette.text.secondary}`,
					background: alpha(theme.palette.grey[400], 0.2),
				},
			}}
		>
			<ListItemButton
				sx={{ display: 'flex', gap: 1.5, borderRadius: '10px' }}
				onClick={() => handleNavigate(item.route!)}
			>
				<Icon
					icon={item.icon}
					color={
						activeRoute === item.route
							? alpha(theme.palette.text.primary, 0.8)
							: theme.palette.text.secondary
					}
					type='solid'
				/>
				<ListItemText primary={item.title} />
			</ListItemButton>
		</ListItem>
	);
};
