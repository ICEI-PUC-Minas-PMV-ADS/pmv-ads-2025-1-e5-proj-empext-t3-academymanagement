import { alpha } from '@mui/material/styles';

import { COMMON } from './colors/common';
import { GREY } from './colors/grey';

declare module '@mui/material/styles/createPalette' {
	interface Palette {
		table: {
			header: {
				background: string;
				text: string;
			};
			footer: string;
			subHeader: string;
			body: string;
			rowOdd: string;
			rowPair: string;
			rowBorder: string;
			loading: string;
		};
		companyInfo: {
			loading: string;
		};
	}
	interface TypeBackground {
		neutral: string;
		home: string;
	}
	interface TypeText {
		lighter: string;
	}
	interface SimplePaletteColorOptions {
		lighter: string;
		darker: string;
	}
	interface PaletteColor {
		lighter: string;
		darker: string;
	}
}

export function palette(mode: 'light' | 'dark') {
	const light = {
		...COMMON,
		mode: 'light',
		text: {
			primary: GREY[800],
			secondary: GREY[700],
			disabled: GREY[500],
			lighter: '#F0F4F9',
		},
		background: {
			home: '#D5DEEC',
			paper: '#BBC8DD',
			default: '#E6ECF4',
			neutral: alpha('#BBC8DD', 0.9),
		},
		table: {
			header: {
				background: '#b1c0d9',
				text: '#313844',
			},
			footer: '#b1c0d9',
			subHeader: '#c1cde0',
			body: '#b1c0d915',
			rowOdd: '#dae1ed',
			rowBorder: '#dfe7f1',
			rowPair: '#cfd9e8',
			loading: '#cfd9e8',
		},
		companyInfo: {
			loading: '#c1cde0',
		},
		action: {
			...COMMON.action,
			active: GREY[600],
		},
	};

	const dark = {
		...COMMON,
		mode: 'dark',
		text: {
			primary: '#FFFFFF',
			secondary: GREY[500],
			disabled: GREY[600],
			lighter: '#F0F4F9',
		},
		background: {
			home: alpha(GREY[500], 0.12),
			paper: GREY[800],
			default: GREY[900],
			neutral: alpha(GREY[500], 0.12),
		},
		table: {
			header: {
				background: '#2f3944',
				text: GREY[100],
			},
			footer: '#2f3944',
			subHeader: '#919eab60',
			body: '#212b36',
			rowOdd: '#3f4a55',
			rowBorder: '#252f3a',
			rowPair: '#313c47',
			loading: '#313c47',
		},
		companyInfo: {
			loading: GREY[900],
		},
		action: {
			...COMMON.action,
			active: GREY[500],
		},
		button: {
			primary: '#ffff',
			txtPrimary: GREY[800],
		},
	};

	return mode === 'light' ? light : dark;
}
