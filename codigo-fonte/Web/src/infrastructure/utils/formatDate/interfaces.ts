export type IDateFormat =
	| 'YYYY/MM/DD'
	| 'YYYY/MM/DD HH:mm:ss'
	| 'YYYY-MM-DD'
	| 'YYYY-MM-DD HH:mm:ss';

export interface IFormatDateProps {
	date: Date | string;
	format?: IDateFormat;
}
