'use client';

import { Box, Drawer } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Routes } from '../../../app/routes';
import { IUserEntity } from '../../../domain/entities/IUserEntity';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../infrastructure/contexts';
import { setAppContext } from '../../../infrastructure/contexts/app';
import { useUserRepository } from '../../../infrastructure/repositories/user';
import { storages } from '../../../infrastructure/utils/localStorage';
import Footer from '../../components/footer';
import { NavBar } from '../../components/header/navBar';
import { ToolBar } from '../../components/header/toolbar';
import { useBoolean } from '../../hooks/useBoolean';
import { useResponsive } from '../../hooks/useResponsive';

export const Dashboard = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const pathName = usePathname();
	const router = useRouter();

	const upMd = useResponsive('down', 'md');
	const isActiveNavBar = useBoolean(false);

	const { getById } = useUserRepository();

	const { user } = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();

	const { setStorage, getStorage } = storages('session');

	const getDataUser = async (userId: IUserEntity['id']) => {
		try {
			const userData = await getById(userId!);

			if (userData) {
				dispatch(
					setAppContext({
						user: userData,
					}),
				);
			} else
				console.error('[GET_USER_ERROR]: ', {
					message: 'User Not Found',
					data: userData,
				});
		} catch (error) {
			enqueueSnackbar('Erro Interno do Servidor', {
				variant: 'error',
			});
			console.error('error', error);
			router.push(Routes.internalServerError);
		}
	};

	useEffect(() => {
		const cacheUserId = getStorage<string>('@user_id:');
		if (cacheUserId || user?.id) getDataUser(cacheUserId || user?.id);
	}, []);

	const renderNavBar = () => {
		if (!upMd) return <NavBar />;
		else
			<Drawer
				open={isActiveNavBar.value}
				onClose={isActiveNavBar.onFalse}
			>
				<NavBar onCloseNavBar={isActiveNavBar.onFalse} />
			</Drawer>;
	};

	useEffect(() => {
		setStorage('@current_path:', pathName);
	}, [pathName]);

	return (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			{renderNavBar()}
			<Box
				sx={{
					minHeight: '100vh',
					width: '100%',
					p: 0,
					m: 0,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					position: 'relative',
				}}
			>
				<ToolBar isActiveNavBar={isActiveNavBar} />
				<Box
					sx={{
						px: 2,
						py: 0,
						flex: 1,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						gap: 1.5,
					}}
				>
					{children}
				</Box>
				<Footer />
			</Box>
		</Box>
	);
};
