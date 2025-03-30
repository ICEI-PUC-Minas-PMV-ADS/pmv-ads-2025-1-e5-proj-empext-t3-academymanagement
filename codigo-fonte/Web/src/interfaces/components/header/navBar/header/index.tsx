'use client';

import { Box, ButtonBase, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '../../../../../infrastructure/contexts';
import { useBoolean } from '../../../../hooks/useBoolean';
import { CompanyInfoHeader } from '../../../companyInfo/header';
import { SkeletonCompanyInfoHeader } from '../../../companyInfo/header/loading';
import { Icon } from '../../../icon';
import { PopupBodyChildren, PopupContainer, PopupHeader } from '../../../popup';
import { IHeaderNavBarProps } from './types';

export const HeaderNavbar = ({ onCloseNavBar }: IHeaderNavBarProps) => {
	const theme = useTheme();
	const isOpenPopup = useBoolean(false);

	const { loading } = useAppSelector((state) => state.app);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'flex-end',
				gap: 1.5,
			}}
		>
			{onCloseNavBar && (
				<Icon
					icon='close'
					type='solid'
					cursor='pointer'
					size='1.5x'
					color={theme.palette.text.secondary}
					onClick={onCloseNavBar}
					aria-label='Fechar Menu de Navegação'
				/>
			)}
			<PopupContainer
				isOpen={isOpenPopup.value}
				onClose={isOpenPopup.onFalse}
			>
				<PopupHeader
					icon='building'
					onClose={isOpenPopup.onFalse}
					title={'Dados da Ninja Team'}
				/>
				<PopupBodyChildren>
					<div
						style={{
							width: '100%',
							minHeight: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<p>NÃO POSSUI MAIS INFORMAÇÕES!</p>
					</div>
				</PopupBodyChildren>
			</PopupContainer>
			<ButtonBase
				sx={{
					'width': '100%',
					'borderRadius': '10px',
					'boxShadow': '0px 0px 3px 1px #00000030',
					'background': theme.palette.background.home,
					'p': '8px',
					'display': 'flex',
					'position': 'relative',
					'flexDirection': 'column',
					'border': `solid 2px ${theme.palette.background.home}`,
					'gap': 2.5,
					'overflow': 'hidden',
					'&:hover .hoverEffect': {
						filter: 'blur(4px)',
						transition: 'filter 0.4s ease-in-out',
					},
					'&:hover .hoverMessage': {
						opacity: 1,
						transition: 'opacity 0.4s ease-in-out',
					},
				}}
				onClick={isOpenPopup.onTrue}
			>
				<Box
					className='hoverEffect'
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						gap: 1,
					}}
				>
					{loading ? (
						<SkeletonCompanyInfoHeader />
					) : (
						<CompanyInfoHeader company_name='Ninja Team' />
					)}
				</Box>
				<Box
					className='hoverMessage'
					sx={{
						cursor: 'pointer',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						color: '#fff',
						fontSize: '1rem',
						opacity: 0,
					}}
				>
					<Typography>Mais Informações</Typography>
				</Box>
			</ButtonBase>
		</Box>
	);
};
