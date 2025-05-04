import React from 'react';
import { SxProps, Theme } from '@mui/material';
import { IconsTypes } from '../../icon/types';

/**
 * Interface for tile component props
 */
export interface ITileProps {
	/**
	 * Custom styles to be applied to the tile
	 */
	sx?: SxProps<Theme>;
	/**
	 * Optional icon to display in the tile
	 */
	icon?: IconsTypes;
	/**
	 * Callback function when tile is clicked
	 */
	onClick?: () => void;
	/**
	 * Content to be rendered inside the tile
	 */
	children?: React.ReactNode;
}
