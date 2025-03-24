import { Controller, useFormContext } from 'react-hook-form';
// @mui
import TextField, { TextFieldProps } from '@mui/material/TextField';
import ReactInputMask from 'react-input-mask';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
	name: string;
};

export default function RHFTextField({
	name,
	helperText,
	type,
	...other
}: Props) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const noMask = (
					<TextField
						{...field}
						fullWidth
						type={type}
						value={
							type === 'number' && field.value === 0
								? ''
								: field.value
						}
						onChange={(event) => {
							if (type === 'number') {
								field.onChange(Number(event.target.value));
							} else {
								field.onChange(event.target.value);
							}
						}}
						error={!!error}
						helperText={error ? error?.message : helperText}
						{...other}
					/>
				);

				if (field.name !== 'cpf') return noMask;

				return (
					// @ts-ignore
					<ReactInputMask
						mask='999.999.999-99'
						onChange={(event) => {
							if (type === 'number') {
								field.onChange(Number(event.target.value));
							} else {
								field.onChange(event.target.value);
							}
						}}
						value={
							type === 'number' && field.value === 0
								? ''
								: field.value
						}
						disabled={field.disabled}
					>
						{
							// @ts-ignore
							() => (
								<TextField
									label={other.label}
									name={field.name}
									fullWidth
									type={type}
									error={!!error}
									helperText={
										error ? error?.message : helperText
									}
								/>
							)
						}
					</ReactInputMask>
				);
			}}
		/>
	);
}
