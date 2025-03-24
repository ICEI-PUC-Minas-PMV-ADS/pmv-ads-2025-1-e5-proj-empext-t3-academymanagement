import { LoadingButton } from '@mui/lab';
import { Box, InputBase, Paper, useTheme } from '@mui/material';
import { useState } from 'react';
import { Icon } from '../../icon';
import { InputTextProps } from './types/InputTextProps';

export const InputText = ({
	value,
	label,
	onChange,
	onSend,
	isLoading,
}: InputTextProps) => {
	const theme = useTheme();

	const [isFocused, setIsFocused] = useState(false);

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			onSend();
		}
	};

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				gap: 1.5,
			}}
		>
			<Paper
				component='form'
				variant='outlined'
				sx={{
					p: 0.8,
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					bgcolor: 'transparent',
					borderWidth: '3px',
					borderColor: isFocused
						? theme.palette.text.primary
						: theme.palette.background.neutral,
					transition: 'border-color 0.3s ease',
				}}
			>
				<InputBase
					sx={{
						'flex': 1,
						'& .MuiInputBase-input::placeholder': {
							color: theme.palette.text.primary,
							fontWeight: '500',
							opacity: 0.8,
						},
					}}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onKeyDown={handleKeyDown}
					placeholder={label}
					inputProps={{ 'aria-label': label }}
				/>
			</Paper>
			<LoadingButton
				variant='outlined'
				loading={isLoading}
				onClick={onSend}
				sx={{
					borderWidth: '3px',
					borderColor: theme.palette.background.neutral,
				}}
			>
				{!isLoading && (
					<Icon
						icon='search'
						type='solid'
						cursor='pointer'
						color={theme.palette.text.primary}
					/>
				)}
			</LoadingButton>
		</Box>
	);
};
