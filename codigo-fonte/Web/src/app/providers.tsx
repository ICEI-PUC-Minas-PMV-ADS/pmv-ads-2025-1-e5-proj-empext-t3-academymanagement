'use client';

import { Provider } from 'react-redux';
import { StoreConfigs } from '../infrastructure/contexts';
import MotionLazy from '../interfaces/components/animate/motion-lazy';
import { SettingsDrawer } from '../interfaces/components/settings';
import { NotistackProvider } from '../interfaces/components/snackbar';
import { ThemeProvider } from '../interfaces/styles/theme';

export const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<Provider store={StoreConfigs}>
			<ThemeProvider>
				<NotistackProvider>
					<SettingsDrawer />
					<MotionLazy>{children}</MotionLazy>
				</NotistackProvider>
			</ThemeProvider>
		</Provider>
	);
};
