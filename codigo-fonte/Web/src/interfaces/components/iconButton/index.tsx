import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '../icon';
import * as S from './styled';
import { IIconButtonProps } from './types/IIconButtonProps';

export const IconButton = ({
	children,
	icon,
	sx,
	size,
	onClick,
}: IIconButtonProps) => {
	const theme = useTheme();

	return (
		<S.ContainerIconButtonRoot onClick={onClick} style={{ ...sx }}>
			<S.ContainerIconButton>
				<Icon
					onClick={onClick}
					icon={icon}
					size={size || '1.5x'}
					type='solid'
				/>
			</S.ContainerIconButton>
			<Typography
				variant='body1'
				sx={{
					fontSize: sx?.fontSize || '.65rem',
					fontWeight: sx?.fontWeight || 'bold',
					textAlign: 'center',
					color: theme.palette.text.primary,
				}}
			>
				{children}
			</Typography>
		</S.ContainerIconButtonRoot>
	);
};
