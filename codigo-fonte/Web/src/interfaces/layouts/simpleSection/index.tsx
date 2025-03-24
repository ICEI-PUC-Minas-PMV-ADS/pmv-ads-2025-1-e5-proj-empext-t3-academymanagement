import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { ICompactSectionProps } from './types';

export const CompactSection = ({ children, sx }: ICompactSectionProps) => {
	return (
		<Container component='main'>
			<Stack
				sx={{
					height: '100vh',
					display: 'flex',
					textAlign: 'center',
					justifyContent: 'center',
					...sx,
				}}
			>
				{children}
			</Stack>
		</Container>
	);
};
