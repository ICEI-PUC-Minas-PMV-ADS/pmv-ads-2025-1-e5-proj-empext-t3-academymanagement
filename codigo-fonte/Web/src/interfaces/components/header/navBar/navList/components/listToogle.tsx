import { ListItemButton, ListItemText, useTheme } from '@mui/material';
import { Icon } from '../../../../icon';
import { INavBarListToogleProps } from '../types';

export const NavBarListToogle = ({
	item,
	isOpen,
	handleToggleGroup,
}: INavBarListToogleProps) => {
	const theme = useTheme();

	return (
		<ListItemButton
			onClick={() => handleToggleGroup(item.title)}
			sx={{
				display: 'flex',
				gap: 1.5,
				borderRadius: '10px',
			}}
		>
			<Icon
				icon={item.icon}
				color={theme.palette.text.secondary}
				type='solid'
			/>
			<ListItemText primary={item.title} />
			<Icon
				icon={isOpen ? 'chevron-up' : 'chevron-down'}
				color={theme.palette.text.secondary}
				type='solid'
			/>
		</ListItemButton>
	);
};
