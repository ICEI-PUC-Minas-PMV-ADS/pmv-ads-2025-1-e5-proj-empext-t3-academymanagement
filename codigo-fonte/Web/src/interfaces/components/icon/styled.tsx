import style from 'styled-components';

import { IConStyledProps } from './types';

export const IconContainer = style.i<{ sx: IConStyledProps }>`
	color: ${({ sx }) => (sx?.color ? sx?.color : '#ffff')};

	cursor: ${({ sx }) => (sx?.cursor ? sx.cursor : 'initial')};

	font-size: ${({ sx }) => {
		if (sx.size) return sx.size.replace('x', 'rem');
		else return '1rem';
	}};
`;
