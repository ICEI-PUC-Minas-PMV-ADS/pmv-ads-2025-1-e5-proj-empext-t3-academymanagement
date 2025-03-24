import { IStorageKeys } from '../../../types/IStorages';

export const storages = (type: 'local' | 'session') => {
	const storages = {
		local: {
			getStorage: <T>(key: IStorageKeys): T | undefined => {
				if (typeof window === 'undefined') return undefined;

				const data = localStorage.getItem(key);

				if (!data) return undefined;

				return JSON.parse(data) as T;
			},
			setStorage: <T>(key: IStorageKeys, data: T) => {
				if (typeof window !== 'undefined') {
					localStorage.setItem(key, JSON.stringify(data));
				}
			},
			clearAllStorage: () => {
				if (typeof window !== 'undefined') {
					localStorage.clear();
				}
			},
			clearStorage: (key: IStorageKeys) => {
				if (typeof window !== 'undefined') {
					localStorage.removeItem(key);
				}
			},
		},
		session: {
			getStorage: <T>(key: IStorageKeys) => {
				if (typeof window === 'undefined') return undefined;

				const data = sessionStorage.getItem(key);

				if (!data) return undefined;

				return JSON.parse(data) as T;
			},
			setStorage: <T>(key: IStorageKeys, data: T) => {
				if (typeof window !== 'undefined') {
					sessionStorage.setItem(key, JSON.stringify(data));
				}
			},
			clearAllStorage: () => {
				if (typeof window !== 'undefined') {
					sessionStorage.clear();
				}
			},
			clearStorage: (key: IStorageKeys) => {
				if (typeof window !== 'undefined') {
					sessionStorage.removeItem(key);
				}
			},
		},
	};

	return storages[type];
};
