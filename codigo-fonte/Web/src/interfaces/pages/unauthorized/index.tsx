'use client';

import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Routes } from '../../../app/routes';
import { MotionContainer, varBounce } from '../../components/animate';
import { useBoolean } from '../../hooks/useBoolean';
import { CompactSection } from '../../layouts/simpleSection';
import { ForbiddenIllustration } from './illustration';
import { metadataUnauthorized } from './metadata';

export const Unauthorized = () => {
	const isLoading = useBoolean(false);
	const router = useRouter();

	return (
		<CompactSection>
			<MotionContainer>
				<m.div variants={varBounce().in}>
					<Typography variant='h3' sx={{ mb: 2 }}>
						{metadataUnauthorized.title}
					</Typography>
				</m.div>

				<m.div variants={varBounce().in}>
					<Typography sx={{ color: 'text.secondary' }}>
						{metadataUnauthorized.description}
					</Typography>
				</m.div>

				<m.div variants={varBounce().in}>
					<ForbiddenIllustration
						sx={{ height: 260, my: { xs: 5, sm: 10 } }}
					/>
				</m.div>

				<LoadingButton
					size='large'
					loading={isLoading.value}
					onClick={() => {
						router.push(Routes.auth);
						isLoading.onTrue();
					}}
					variant='contained'
				>
					Voltar para Login
				</LoadingButton>
			</MotionContainer>
		</CompactSection>
	);
};
