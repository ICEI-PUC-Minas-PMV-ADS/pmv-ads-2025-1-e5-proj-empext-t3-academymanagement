'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Tile } from '../../../../../components/tile';
import { styles } from './styles';
import { ITilesProps } from './types/ITilesProps';

interface TilesComponentProps {
	tiles: ITilesProps[];
}

export const Tiles = ({ tiles }: TilesComponentProps) => {
	const theme = useTheme();

	if (!tiles?.length) {
		return null;
	}

	return (
		<>
			{tiles.map(({ name, value }) => (
				<Tile key={name}>
					<Box
						sx={{
							...styles.tileContainer,
							height: '100px',
							color: theme.palette.text.primary,
							backgroundColor: theme.palette.background.neutral,
						}}
					>
						<Box>
							<Typography variant='h4' sx={styles.valueText}>
								{value}
							</Typography>
						</Box>
						<Box>
							<Typography variant='body1'>{name}</Typography>
						</Box>
					</Box>
				</Tile>
			))}
		</>
	);
};
