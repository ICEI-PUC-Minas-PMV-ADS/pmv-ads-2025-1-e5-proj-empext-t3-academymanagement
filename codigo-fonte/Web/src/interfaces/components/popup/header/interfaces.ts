import { IconsTypes } from '../../icon/types';

export interface IPopupContainerProps {
	onClose?: () => void;
	title?: string;
	icon?: IconsTypes;
}
