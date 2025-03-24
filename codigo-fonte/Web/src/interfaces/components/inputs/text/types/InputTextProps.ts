export interface InputTextProps {
	value: string;
	label: string;
	onChange: (text: string) => void;
	onSend: () => void;
	isLoading?: boolean;
}
