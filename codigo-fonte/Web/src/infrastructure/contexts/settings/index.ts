import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { storages } from '../../utils/localStorage';
import { settingInitialState } from './initialState';
import { ISettingsState } from './types/ISettingsState';

export const SettingsSlice = createSlice({
	name: 'setting',
	initialState: settingInitialState,
	reducers: {
		onUpdateSettings: (
			state: ISettingsState,
			action: PayloadAction<Partial<ISettingsState>>,
		) => {
			const { getStorage, setStorage } = storages('local');

			const currentSettings =
				getStorage<ISettingsState>('@settings:') || {};

			const updatedSettings = {
				...currentSettings,
				...action.payload,
			};

			setStorage('@settings:', updatedSettings);
			Object.assign(state, updatedSettings);

			if (updatedSettings.themeMode !== settingInitialState.themeMode)
				state.canReset = true;
			else state.canReset = false;
		},
		onResetSettings: (state) => {
			const { clearStorage } = storages('local');
			clearStorage('@settings:');
			Object.assign(state, settingInitialState);
		},
		closeDrawerSettings: (state) => {
			state.isActiveDrawer = false;
		},
		openDrawerSettings: (state) => {
			state.isActiveDrawer = true;
		},
	},
});

export const SettingsReducer = SettingsSlice.reducer;

export const {
	onResetSettings,
	onUpdateSettings,
	closeDrawerSettings,
	openDrawerSettings,
} = SettingsSlice.actions;
