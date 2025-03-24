import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppContextReducer } from './app';
import { SettingsReducer } from './settings';

export const StoreConfigs = configureStore({
	reducer: {
		app: AppContextReducer,
		settings: SettingsReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export const useAppDispatch: () => typeof StoreConfigs.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof StoreConfigs.getState>
> = useSelector;
