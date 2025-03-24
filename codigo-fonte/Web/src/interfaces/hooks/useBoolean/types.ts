export interface IUserBooleanRes {
	value: boolean;
	onTrue: () => void;
	onFalse: () => void;
	onToggle: () => void;
	setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
