'use client';

import { useCallback, useState } from 'react';
import { IUserBooleanRes } from './types';

export function useBoolean(defaultValue?: boolean): IUserBooleanRes {
	const [value, setValue] = useState(!!defaultValue);

	const onTrue = useCallback(() => {
		setValue(true);
	}, []);

	const onFalse = useCallback(() => {
		setValue(false);
	}, []);

	const onToggle = useCallback(() => {
		setValue((prev) => !prev);
	}, []);

	return {
		value,
		onTrue,
		onFalse,
		onToggle,
		setValue,
	};
}
