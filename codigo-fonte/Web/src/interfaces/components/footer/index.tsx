'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
	const theme = useTheme();

	return (
		<Box
			component={'footer'}
			sx={{
				width: '100%',
				background: 'rgba(82, 82, 82, 1)',
				textAlign: 'center',
				p: 0.5,
			}}
		>
			<Typography
				fontSize={9.5}
				sx={{ color: theme.palette.text.lighter }}
			>
				©Copyright 2025-2025 Ninja Team - Todos os Direitos Reservados
			</Typography>
		</Box>
	);
};

export default Footer;
