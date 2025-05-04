import { IconsTypes } from '../../../icon/types';

type INavBarProps = {
	title: string;
	icon: IconsTypes;
	route?: string;
};

export interface INavBarRoutes extends INavBarProps {
	children?: INavBarProps[];
}
