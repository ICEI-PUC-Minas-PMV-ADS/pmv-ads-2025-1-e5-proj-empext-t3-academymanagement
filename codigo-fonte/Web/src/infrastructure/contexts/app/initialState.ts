import { IAppState } from './types/IAppState';

export const appInitialState: IAppState = {
	user: undefined,
	token: undefined,
	authenticated: false,
	loading: false,
};
