import { AxiosError } from 'axios';

interface IErrorProps {
	message: string;
	statusCode: number;
	type:
		| 'valid-token'
		| 'invalid-token'
		| 'access-denied'
		| 'expired-token'
		| 'expired-refresh-token';
}

export type IAxiosError = AxiosError<IErrorProps>;
