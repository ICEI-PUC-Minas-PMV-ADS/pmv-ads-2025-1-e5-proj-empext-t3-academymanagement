import Badge, { badgeClasses } from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { m } from 'framer-motion';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../infrastructure/contexts';
import { openDrawerSettings } from '../../../../../infrastructure/contexts/settings';
import { varHover } from '../../../animate';
import { Icon } from '../../../icon';

type Props = {
	sx?: SxProps<Theme>;
};

export const SettingsButton = ({ sx }: Props) => {
	const { canReset, isActiveDrawer } = useAppSelector(
		(state) => state.settings,
	);

	const theme = useTheme();

	const dispatch = useAppDispatch();

	return (
		<Badge
			color='error'
			variant='dot'
			invisible={!canReset}
			sx={{
				[`& .${badgeClasses.badge}`]: {
					top: 8,
					right: 8,
				},
				...sx,
			}}
		>
			<Box
				component={m.div}
				animate={{
					rotate: [0, isActiveDrawer ? 0 : 360],
				}}
				transition={{
					duration: 12,
					ease: 'linear',
					repeat: Infinity,
				}}
			>
				<IconButton
					component={m.button}
					whileTap='tap'
					whileHover='hover'
					variants={varHover(1.05)}
					aria-label='settings'
					onClick={() => dispatch(openDrawerSettings())}
					sx={{
						width: 40,
						height: 40,
					}}
				>
					<Icon
						icon='cog'
						cursor='pointer'
						color={theme.palette.action.active}
						type='solid'
						size='1.5x'
					/>
				</IconButton>
			</Box>
		</Badge>
	);
};
