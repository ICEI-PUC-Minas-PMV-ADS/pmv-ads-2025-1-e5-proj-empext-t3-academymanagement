'use client';

import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MotionContainer, varBounce } from '../../components/animate';
import { useBoolean } from '../../hooks/useBoolean';
import { CompactSection } from '../../layouts/simpleSection';
import { SeverErrorIllustration } from './illustration';
import { metadataInternalError } from './metadata';

export const InternalError = () => {
	const router = useRouter();
	const isLoading = useBoolean(false);

	return (
		<CompactSection>
			<MotionContainer>
				<m.div variants={varBounce().in}>
					<Typography variant='h3' sx={{ mb: 2 }}>
						{metadataInternalError.title}
					</Typography>
				</m.div>

				<m.div variants={varBounce().in}>
					<Typography sx={{ color: 'text.secondary' }}>
						{metadataInternalError.description}
					</Typography>
				</m.div>

				<m.div variants={varBounce().in}>
					<SeverErrorIllustration
						sx={{ height: 260, my: { xs: 5, sm: 10 } }}
					/>
				</m.div>

				<LoadingButton
					onClick={() => {
						isLoading.onTrue();
						router.back();
					}}
					loading={isLoading.value}
					size='large'
					variant='contained'
				>
					Voltar para a Página Anterior
				</LoadingButton>
			</MotionContainer>
		</CompactSection>
	);
};
