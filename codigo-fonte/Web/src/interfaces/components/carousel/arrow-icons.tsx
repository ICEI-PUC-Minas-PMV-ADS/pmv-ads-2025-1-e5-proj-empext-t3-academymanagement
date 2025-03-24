import { Icon } from '../icon';
import { IconProps } from '../icon/types';

type Props = {
	icon?: IconProps; // Right icon
	isRTL?: boolean;
};

export function LeftIcon({ icon }: Props) {
	const iconProps: IconProps = {
		type: icon?.type ? icon.type : 'solid',
		icon: icon?.icon ? icon.icon : 'chevron-left',
		...icon,
	};

	return <Icon {...iconProps} />;
}

export function RightIcon({ icon }: Props) {
	const iconProps: IconProps = {
		type: icon?.type ? icon.type : 'solid',
		icon: icon?.icon ? icon.icon : 'chevron-right',
		...icon,
	};

	return <Icon {...iconProps} />;
}
