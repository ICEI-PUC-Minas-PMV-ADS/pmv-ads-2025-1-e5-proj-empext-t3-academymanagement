import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ----------------------------------------------------------------------

export default function RHFDatePicker({ name }: any) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<DatePicker
					{...field}
					// maxDate={new Date()}
					label='Selecione uma data'
					defaultValue={undefined}
				/>
			)}
		/>
	);
}
