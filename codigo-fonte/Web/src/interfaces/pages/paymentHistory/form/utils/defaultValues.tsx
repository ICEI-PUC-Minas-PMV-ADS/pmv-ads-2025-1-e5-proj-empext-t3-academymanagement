import { IFormProps } from '../types/formProps';

export const generateDefaultValues = (
	editPaymentHistory?: IFormProps['editPaymentHistory'],
) => ({
	id: editPaymentHistory?.id || undefined,
	user_id: editPaymentHistory?.subscription?.user_id || undefined,
	cost: editPaymentHistory?.cost || undefined,
	observation: editPaymentHistory?.observation || undefined,
});
