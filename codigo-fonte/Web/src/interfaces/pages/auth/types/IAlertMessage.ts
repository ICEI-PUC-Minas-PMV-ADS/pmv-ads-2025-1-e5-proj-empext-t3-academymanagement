export interface IAlertMessage {
	variant: 'warning' | 'success' | 'info' | 'error';
	message: string;
}
