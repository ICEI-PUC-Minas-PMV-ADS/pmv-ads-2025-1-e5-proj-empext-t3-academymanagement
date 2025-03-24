import { useMemo } from 'react';
import { useAppSelector } from '../../../../infrastructure/contexts';
import { INavBarRoutes } from '../navBar/types/INavBarRoutes';
import { navBarDefault } from './default';

export const useNavBarConfig = (): INavBarRoutes[] => {
	const { company } = useAppSelector((state) => state.app);

	const configs = useMemo(
		() => ({
			default: navBarDefault,
		}),
		[],
	);

	return useMemo(() => {
		return configs.default as INavBarRoutes[];
	}, [company, configs]);
};
