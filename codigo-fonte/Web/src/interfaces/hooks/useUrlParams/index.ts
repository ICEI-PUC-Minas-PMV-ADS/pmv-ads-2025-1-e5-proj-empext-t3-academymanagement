import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useUrlParams = <T extends string>(paramKeys: T[]) => {
	const searchParams = useSearchParams();

	const params = paramKeys.reduce(
		(acc, key) => {
			acc[key] = searchParams.get(key);
			return acc;
		},
		{} as Record<T, string | null>,
	);

	useEffect(() => {
		let hasParam = false;
		const paramsURL = new URLSearchParams(searchParams);

		paramKeys.forEach((key) => {
			if (params[key]) {
				hasParam = true;
				paramsURL.delete(key);
			}
		});

		if (hasParam) {
			let newUrl = window.location.pathname;

			if (paramsURL.toString()) {
				newUrl = `${window.location.pathname}?${paramsURL}`;
			}

			window.history.replaceState({}, '', newUrl);
		}
	}, [paramKeys, params, searchParams]);

	return params;
};
