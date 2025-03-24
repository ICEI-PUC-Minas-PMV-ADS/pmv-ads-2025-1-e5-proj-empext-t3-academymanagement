export type IColumnsTypes = 'Date' | 'Text' | 'Number' | 'DateTime';

export interface IColumnsProps {
	id: string | (string | number)[];
	title: string;
	visible: boolean;
	order?: number;
	width?: number;
	type: IColumnsTypes;
}
