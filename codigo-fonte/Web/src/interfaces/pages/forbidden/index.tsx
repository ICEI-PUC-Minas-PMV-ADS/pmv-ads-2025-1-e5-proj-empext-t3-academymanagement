'use client';

import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MotionContainer, varBounce } from '../../components/animate';
import { useBoolean } from '../../hooks/useBoolean';
import { CompactSection } from '../../layouts/simpleSection';
import { ForbiddenIllustration } from './illustration';
import { metadataForbiden } from './metadata';

export const Forbidden = () => {
	const router = useRouter();
	const isLoading = useBoolean(false);

	return (
		<CompactSection>
			<MotionContainer>
				<m.div variants={varBounce().in}>
					<Typography variant='h3' sx={{ mb: 2 }}>
						{metadataForbiden.title}
					</Typography>
				</m.div>

				<m.div variants={varBounce().in}>
					<Typography sx={{ color: 'text.secondary' }}>
						{metadataForbiden.description}
					</Typography>
				</m.div>

				<m.div variants={varBounce().in}>
					<ForbiddenIllustration
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
