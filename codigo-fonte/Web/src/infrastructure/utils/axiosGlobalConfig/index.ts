import { AxiosInstance } from 'axios';
import { IAxiosError } from './types/IAxiosError';
import { IGlobalConfigProps } from './types/IGlobalConfigProps';

export const axiosGlobalConfig = (
	instances: AxiosInstance[],
	{ token }: IGlobalConfigProps,
) => {
	instances.forEach((instance) => {
		instance.defaults.headers.common.Authorization = `Bearer ${token}`;

		instance.interceptors.response.use(
			(res) => res,
			(error: IAxiosError) => {
				console.error(error);
				return error;
			},
		);
	});
};
