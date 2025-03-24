import React from 'react';
import { IConStyledProps, IconsTypes } from '../../icon/types';

export interface IIconButtonProps {
	sx?: React.CSSProperties;
	icon: IconsTypes;
	size?: IConStyledProps['size'];
	onClick?: () => void;
	children?: React.ReactNode;
}
