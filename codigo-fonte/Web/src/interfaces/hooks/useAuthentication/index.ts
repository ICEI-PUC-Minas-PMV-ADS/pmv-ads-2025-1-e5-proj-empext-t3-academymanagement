import { useRouter } from 'next/navigation';
import { Routes } from '../../../app/routes';
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

			const jwtDecode = {
				user_id: '67d97e039047a622b6e6ee00',
				user_name: 'Admin Lotus Hotel',
				iat: 1742352535,
				exp: 1742957335,
			};

			if (!jwtDecode || !jwtDecode.user_id) {
				console.error(`Error: JWT Decode Not Found`);
				router.push(Routes.unauthorized);
				return;
			}

			axiosGlobalConfig([apiInstance], {
				token: decodeURIComponent(token),
			});

			setStorage('@token:', token);
			setStorage('@user_id:', jwtDecode.user_id);

			dispatch(
				setAppContext({
					token: token,
					authenticated: true,
					user: {
						id: jwtDecode.user_id,
						name: jwtDecode.user_name,
					},
				}),
			);

			const current_path = getStorage<string>('@current_path:');

			router.push(current_path || Routes.establishment);
		},
		closeSession: async () => {
			router.push(Routes.home);
			clearAllStorage();
			await simulateDelay(500);
			dispatch(clearAppContext());
		},
	};
};
