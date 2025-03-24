import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import React from 'react';

export interface IPopupContainerProps {
	children: React.ReactNode;
	onClose?: () => void;
	isOpen: boolean;
	sx?: SxProps<Theme>;
}
