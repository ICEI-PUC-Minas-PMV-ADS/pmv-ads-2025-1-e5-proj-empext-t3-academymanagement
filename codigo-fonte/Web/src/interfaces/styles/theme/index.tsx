'use client';

import { CssBaseline } from '@mui/material';
import {
	ThemeProvider as MuiThemeProvider,
	createTheme,
} from '@mui/material/styles';
import merge from 'lodash/merge';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../../../infrastructure/contexts';
import { ISettingsState } from '../../../infrastructure/contexts/settings/types/ISettingsState';
import { IThemeProps } from './interface';
import { componentsOverrides } from './overrides';
import { palette } from './pallete';
import { customShadows } from './shadows/custom';
import { shadows } from './shadows/default';
import { StyledComponentsRegistry } from './styledComponentsRegistry';
import { typography } from './typography';

export const ThemeProvider = ({ children }: IThemeProps) => {
	const [themeMode, setThemeMode] =
		useState<ISettingsState['themeMode']>('light');

	const { themeMode: appThemeMode } = useAppSelector(
		(state) => state.settings,
	);

	useEffect(() => {
		if (appThemeMode) setThemeMode(appThemeMode);
	}, [appThemeMode]);

	const theme = createTheme({
		shadows: shadows(themeMode),
		customShadows: customShadows(themeMode),
		//@ts-ignore
		palette: palette(themeMode),
		typography,
	});

	theme.components = merge(componentsOverrides(theme));

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
		</MuiThemeProvider>
	);
};
