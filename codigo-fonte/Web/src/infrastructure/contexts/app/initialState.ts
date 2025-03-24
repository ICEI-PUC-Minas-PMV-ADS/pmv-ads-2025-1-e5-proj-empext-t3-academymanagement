import { IAppState } from './types/IAppState';

export const appInitialState: IAppState = {
	user: undefined,
	company: undefined,
	establishment: undefined,
	token: undefined,
	authenticated: false,
	loading: false,
};
