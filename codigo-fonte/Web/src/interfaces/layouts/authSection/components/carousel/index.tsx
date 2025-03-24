'use client';

import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Carousel, { useCarousel } from '../../../../components/carousel';
import { useResponsive } from '../../../../hooks/useResponsive';
import { bgGradient } from '../../../../styles/theme/css';
import { DataAuthCarousel } from './data';

export const CarouselAuth = () => {
	const upMd = useResponsive('up', 'md');

	const carousel = useCarousel({
		autoplay: true,
	});

	if (upMd) {
		return (
			<Stack
				alignItems='center'
				justifyContent='center'
				sx={{
					width: '100%',
					height: '100%',
					...bgGradient({
						color: '#161C24',
					}),
				}}
			>
				<Box
					component='div'
					sx={{
						width: 500,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box sx={{ width: '100%' }}>
						<Carousel
							ref={carousel.carouselRef}
							{...carousel.carouselSettings}
						>
							{DataAuthCarousel.map((item, index) => (
								<Box key={index}>
									<Image
										style={{ marginLeft: '50px' }}
										src={item.svg}
										alt={item.description}
										width={400}
									/>
									<Typography
										variant='subtitle1'
										sx={{
											color: 'text.secondary',
											textAlign: 'center',
										}}
									>
										{item.description}
									</Typography>
								</Box>
							))}
						</Carousel>
					</Box>
				</Box>
			</Stack>
		);
	} else return <></>;
};
