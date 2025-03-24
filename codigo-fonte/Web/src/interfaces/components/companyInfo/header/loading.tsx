import { Box, Skeleton, useTheme } from '@mui/material';

export const SkeletonCompanyInfoHeader = () => {
	const theme = useTheme();

	const color = {
		backgroundColor: theme.palette.companyInfo.loading,
	};

	return (
		<Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Skeleton
				sx={{ ...color }}
				variant='rounded'
				width={90}
				height={55}
			/>
			<Box sx={{ maxWidth: '100%', width: '100%', overflow: 'hidden' }}>
				<Skeleton
					sx={{ ...color }}
					variant='text'
					width='auto'
					height={19}
				/>
				<Skeleton
					sx={{ ...color }}
					variant='text'
					width='100%'
					height={19}
				/>
				<Skeleton
					sx={{ ...color }}
					variant='text'
					width='100%'
					height={19}
				/>
			</Box>
		</Box>
	);
};
