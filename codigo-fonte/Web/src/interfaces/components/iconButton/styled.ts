import { styled } from 'styled-components';

export const ContainerIconButtonRoot = styled.div`
	width: 70px;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 5px;
`;

export const ContainerIconButton = styled.button`
	width: 50px;
	height: 50px;

	cursor: pointer;

	background-color: #e5e5e5;
	border-radius: 15px;
	border: 3px solid #37424d;

	display: flex;
	align-items: center;
	justify-content: center;

	* {
		color: #37424d;
		cursor: pointer;
	}

	&:hover {
		background-color: #37424d;
		border: 3px solid #e5e5e5;

		* {
			color: #e5e5e5;
		}
	}

	transition: all 0.4s ease;
`;
