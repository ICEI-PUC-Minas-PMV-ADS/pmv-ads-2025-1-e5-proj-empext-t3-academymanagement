import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import { Icon } from '../../../icon';
import { IBaseOptionsProps } from './types';

export const BaseOptions = ({
	options,
	value,
	onChange,
}: IBaseOptionsProps) => {
	const theme = useTheme();

	return (
		<Stack direction='row' spacing={2}>
			{options.map((option, index) => {
				const selected = value === option;

				return (
					<ButtonBase
						key={option}
						onClick={() => onChange(option)}
						sx={{
							'width': 1,
							'height': 80,
							'borderRadius': 1,
							'border': (theme) =>
								`solid 1px ${theme.palette.grey[600]}`,
							...(selected && {
								bgcolor: 'background.neutral',
								boxShadow: (theme) =>
									`-24px 8px 24px -4px ${alpha(
										theme.palette.mode === 'light'
											? theme.palette.grey[500]
											: theme.palette.common.black,
										0.08,
									)}`,
							}),
							'& .svg-color': {
								background: (theme) =>
									`linear-gradient(135deg, ${theme.palette.grey[500]} 0%, ${theme.palette.grey[600]} 100%)`,
								...(selected && {
									background: (theme) =>
										`linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
								}),
							},
						}}
					>
						{index === 0 ? (
							<Icon
								icon='sun-bright'
								type='duotone'
								size='1.5x'
								color={theme.palette.text.secondary}
							/>
						) : (
							<Icon
								icon='moon-stars'
								type='duotone'
								size='1.5x'
								color={theme.palette.text.secondary}
							/>
						)}
					</ButtonBase>
				);
			})}
		</Stack>
	);
};
