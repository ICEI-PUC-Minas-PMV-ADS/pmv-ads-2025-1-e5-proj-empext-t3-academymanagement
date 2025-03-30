import { styled } from 'styled-components';

export const DialogHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;

	position: relative;
`;

export const DialogDescription = styled.p`
	font-weight: initial;
	font-size: 0.8rem;
	margin: 0;
	margin-left: 20px;
	margin-top: 10px;
	color: #ffffff90;
`;

export const DialogClose = styled.div`
	position: absolute;
	z-index: 9999;

	width: 50px;
	height: 50px;
	right: 0;
`;
