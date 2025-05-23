import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------
import React from 'react';
type Props = {
	children: React.ReactNode;
	methods: UseFormReturn<any>;
	onSubmit?: VoidFunction;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
	return (
		<Form {...methods}>
			<form onSubmit={onSubmit}>{children}</form>
		</Form>
	);
}
