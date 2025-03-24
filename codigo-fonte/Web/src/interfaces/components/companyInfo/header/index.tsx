import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import ImgClientDefault from '../../../../../public/images/mock/client_01.png';
import { ICompanyInfoHeader } from './interfaces';
import * as S from './styled';

export const CompanyInfoHeader = ({ company_name, sx }: ICompanyInfoHeader) => {
	const theme = useTheme();

	return (
		<S.CompanyInfoHeader style={sx}>
			<Image
				style={{
					borderRadius: '50%',
					border: `solid 2px ${theme.palette.divider}`,
				}}
				src={ImgClientDefault}
				alt='Logo do Estabelecimento'
				width={70}
			/>
			<Box
				sx={{
					overflow: 'hidden',
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					columnGap: 1,
					justifyContent: 'center',
				}}
			>
				<Typography
					sx={{
						color: theme.palette.text.secondary,
						fontWeight: 700,
						fontSize: '1.3rem',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						textAlign: 'start',
						maxWidth: '230px',
					}}
				>
					{company_name}
				</Typography>
			</Box>
		</S.CompanyInfoHeader>
	);
};
