import axios, { AxiosInstance } from 'axios';

export const apiInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_HOST_ADMIN_API,
});
