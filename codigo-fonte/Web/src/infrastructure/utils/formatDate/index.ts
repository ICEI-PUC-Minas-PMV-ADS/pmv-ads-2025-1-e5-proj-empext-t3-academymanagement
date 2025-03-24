import { IFormatDateProps } from './interfaces';

/**
 * Formats a date into the desired format.
 * @param date The date to be formatted (can be a string or a Date object).
 * @param format The desired date format (default is "YYYY-MM-DD").
 * @returns The formatted date.
 */
export const formatDate = ({
	date,
	format = 'YYYY-MM-DD',
}: IFormatDateProps): string => {
	const d = new Date(date);

	if (isNaN(d.getTime())) {
		console.log('date', date);
		return 'Não Informado';
	}

	const map: Record<string, string | number> = {
		YYYY: d.getFullYear(),
		MM: String(d.getMonth() + 1).padStart(2, '0'),
		DD: String(d.getDate()).padStart(2, '0'),
		HH: String(d.getHours()).padStart(2, '0'),
		mm: String(d.getMinutes()).padStart(2, '0'),
		ss: String(d.getSeconds()).padStart(2, '0'),
	};

	return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) =>
		String(map[match]),
	);
};
