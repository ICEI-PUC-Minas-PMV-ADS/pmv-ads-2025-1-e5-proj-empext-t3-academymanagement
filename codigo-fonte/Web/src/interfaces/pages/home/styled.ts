import { alpha } from '@mui/material';
import { styled } from 'styled-components';
import { GREY } from '../../styles/theme/colors/grey';

export const ActionsContainer = styled.div`
	width: 100%;

	height: 100%;
	min-height: 120px;
	max-height: 150px;

	background-color: ${alpha(GREY[700], 0.2)};
	border: 2px solid ${GREY[800]};
	border-radius: 15px;

	display: flex;
	align-items: center;
	justify-content: space-around;
`;
