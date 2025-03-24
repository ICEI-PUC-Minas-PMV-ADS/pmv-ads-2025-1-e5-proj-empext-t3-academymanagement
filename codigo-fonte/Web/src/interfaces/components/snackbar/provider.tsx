'use client';

import { useRef } from 'react';

import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import { Icon } from '../icon';
// eslint-disable-next-line import/order
import * as S from './styled';

type Props = {
	children: React.ReactNode;
};

export const NotistackProvider = ({ children }: Props) => {
	const theme = useTheme();

	const isRTL = 'rtl';

	const notistackRef = useRef(null);

	return (
		<SnackbarProvider
			ref={notistackRef}
			maxSnack={5}
			preventDuplicate
			autoHideDuration={3000}
			TransitionComponent={isRTL ? Collapse : undefined}
			variant='success'
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			iconVariant={{
				info: (
					<S.StyledIcon color='info'>
						<Icon
							icon='info-circle'
							size='1.25x'
							color={theme.palette['info'].main}
							type='regular'
						/>
					</S.StyledIcon>
				),
				success: (
					<S.StyledIcon color='success'>
						<Icon
							icon='check-circle'
							color={theme.palette['success'].main}
							size='1.25x'
							type='regular'
						/>
					</S.StyledIcon>
				),
				warning: (
					<S.StyledIcon color='warning'>
						<Icon
							icon='exclamation-triangle'
							size='1.25x'
							type='regular'
							color={theme.palette['warning'].main}
						/>
					</S.StyledIcon>
				),
				error: (
					<S.StyledIcon color='error'>
						<Icon
							icon='exclamation-circle'
							size='1.25x'
							color={theme.palette['error'].main}
							type='regular'
						/>
					</S.StyledIcon>
				),
			}}
			Components={{
				default: S.StyledNotistack,
				info: S.StyledNotistack,
				success: S.StyledNotistack,
				warning: S.StyledNotistack,
				error: S.StyledNotistack,
			}}
		>
			{children}
		</SnackbarProvider>
	);
};
