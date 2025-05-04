'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ITileProps } from './types/ITileProps';
import { styles } from './styles';

/**
 * A clickable tile component that can display content with optional icon
 * and hover effects.
 */
export const Tile = ({ children, onClick }: ITileProps) => {
	const theme = useTheme();

	return (
		<Box component='div' onClick={onClick} sx={styles.root(theme)}>
			{children}
		</Box>
	);
};
