import { alpha } from '@mui/material';

import { BLUE } from './blue';
import { ERROR } from './error';
import { GREY } from './grey';
import { INFO } from './info';
import { PURPLE } from './purple';
import { SUCCESS } from './success';
import { WARNING } from './warning';

export const COMMON = {
	common: {
		black: '#000000',
		white: '#FFFFFF',
	},
	primary: BLUE,
	secondary: PURPLE,
	info: INFO,
	success: SUCCESS,
	warning: WARNING,
	error: ERROR,
	grey: GREY,
	divider: alpha(GREY[500], 0.2),
	action: {
		hover: alpha(GREY[500], 0.08),
		selected: alpha(GREY[500], 0.16),
		disabled: alpha(GREY[500], 0.8),
		disabledBackground: alpha(GREY[500], 0.24),
		focus: alpha(GREY[500], 0.24),
		hoverOpacity: 0.08,
		disabledOpacity: 0.48,
	},
};
