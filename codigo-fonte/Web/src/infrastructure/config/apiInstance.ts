import axios, { AxiosInstance } from 'axios';

export const apiInstance: AxiosInstance = axios.create({
	
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5194',
	headers: {
		'Content-Type': 'application/json',
	},
	 withCredentials: true,
});
