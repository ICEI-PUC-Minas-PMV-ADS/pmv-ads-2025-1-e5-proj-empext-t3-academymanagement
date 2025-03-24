// @mui
import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IBreakpointOrNull, IQuery, IReturnType, IValue } from './interfaces';

// ----------------------------------------------------------------------

export function useResponsive(
	query: IQuery,
	start?: IValue,
	end?: IValue,
): IReturnType {
	const theme = useTheme();

	const mediaUp = useMediaQuery(theme.breakpoints.up(start as IValue));

	const mediaDown = useMediaQuery(theme.breakpoints.down(start as IValue));

	const mediaBetween = useMediaQuery(
		theme.breakpoints.between(start as IValue, end as IValue),
	);

	const mediaOnly = useMediaQuery(
		theme.breakpoints.only(start as Breakpoint),
	);

	if (query === 'up') {
		return mediaUp;
	}

	if (query === 'down') {
		return mediaDown;
	}

	if (query === 'between') {
		return mediaBetween;
	}

	return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth() {
	const theme = useTheme();

	const keys = [...theme.breakpoints.keys].reverse();

	return (
		keys.reduce((output: IBreakpointOrNull, key: Breakpoint) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const matches = useMediaQuery(theme.breakpoints.up(key));

			return !output && matches ? key : output;
		}, null) || 'xs'
	);
}
