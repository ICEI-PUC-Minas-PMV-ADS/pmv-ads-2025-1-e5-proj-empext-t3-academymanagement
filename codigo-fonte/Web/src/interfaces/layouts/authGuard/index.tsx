'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Routes } from '../../../app/routes';
import { useAppSelector } from '../../../infrastructure/contexts';
import { storages } from '../../../infrastructure/utils/localStorage';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useBoolean } from '../../hooks/useBoolean';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const { getStorage } = storages('session');

	const { authSession } = useAuthentication();
	const isAuthenticated = useBoolean(false);
	const router = useRouter();

	const { authenticated, token } = useAppSelector((state) => state.app);

	useEffect(() => {
		if (!authenticated) {
			const cacheToken = getStorage<string>('@token:');

			if (!cacheToken && !token) {
				console.error("The user's session has expired");
				router.push(Routes.home);
				return;
			}

			authSession({
				token: token || cacheToken,
			});
		} else isAuthenticated.onTrue();
	}, [
		authenticated,
		router,
		isAuthenticated,
		getStorage,
		authSession,
		token,
	]);

	return isAuthenticated.value ? <>{children}</> : null;
};
