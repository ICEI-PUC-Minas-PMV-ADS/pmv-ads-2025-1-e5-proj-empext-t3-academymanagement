import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { Routes } from '../../../app/routes';
import { IAuthPayload } from '../../../domain/dtos/IAuth.dto';
import { apiInstance } from '../../../infrastructure/config/apiInstance';
import { useAppDispatch } from '../../../infrastructure/contexts';
import {
	clearAppContext,
	setAppContext,
} from '../../../infrastructure/contexts/app';
import { axiosGlobalConfig } from '../../../infrastructure/utils/axiosGlobalConfig';
import { storages } from '../../../infrastructure/utils/localStorage';
import { simulateDelay } from '../../../infrastructure/utils/simulateDelay';
import { IAuthSessionProps } from './types/IAuthSession';

export const useAuthentication = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { setStorage, clearAllStorage, getStorage } = storages('session');

	return {
		authSession: async ({ token }: IAuthSessionProps) => {
			if (!token) {
				console.warn('Token not informed');
				router.push(Routes.unauthorized);
				return;
			}

			const decodedToken = jwtDecode<IAuthPayload>(token);

			if (!decodedToken || !decodedToken.user) {
				console.error(`Error: JWT Decode Not Found`);
				router.push(Routes.unauthorized);
				return;
			}

			axiosGlobalConfig([apiInstance], {
				token: decodeURIComponent(token),
			});

			setStorage('@token:', token);
			setStorage('@user_id:', decodedToken.user.id);

			dispatch(
				setAppContext({
					token: token,
					authenticated: true,
					user: decodedToken.user,
				}),
			);

			const current_path = getStorage<string>('@current_path:');

			router.push(current_path || Routes.dashboard);
		},
		closeSession: async () => {
			router.push(Routes.home);
			clearAllStorage();
			await simulateDelay(500);
			dispatch(clearAppContext());
		},
	};
};
