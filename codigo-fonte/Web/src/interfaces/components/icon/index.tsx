import React from 'react';

import * as S from './styled';
import { IconProps } from './types';

export const Icon: React.FC<IconProps> = ({
	type,
	icon,
	size,
	cursor,
	color,
	...rest
}) => (
	<S.IconContainer
		{...rest}
		sx={{ cursor, size, color }}
		className={`fas fa-${type} fa-${icon}`}
	/>
);
