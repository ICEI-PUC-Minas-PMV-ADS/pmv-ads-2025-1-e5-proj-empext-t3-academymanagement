'use client';

import Image from 'next/image';

import { ILogoProps } from './types/ILogoProps';

import logoThemeDark from '../../../../public/images/logo/dark.svg';
import logoThemeLight from '../../../../public/images/logo/light.svg';
import { useAppSelector } from '../../../infrastructure/contexts';

export const Logo = ({ height, width }: ILogoProps) => {
	const { themeMode } = useAppSelector((state) => state.settings);

	return (
		<Image
			src={themeMode === 'dark' ? logoThemeDark : logoThemeLight}
			alt='Logo do Site (DTO)'
			width={width || 150}
			height={height || 150}
		/>
	);
};
