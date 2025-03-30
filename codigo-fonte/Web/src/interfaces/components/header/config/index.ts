import { INavBarRoutes } from '../navBar/types/INavBarRoutes';
import { navBarDefault } from './default';

export const useNavBarConfig = (): INavBarRoutes[] => {
	return navBarDefault;
};
