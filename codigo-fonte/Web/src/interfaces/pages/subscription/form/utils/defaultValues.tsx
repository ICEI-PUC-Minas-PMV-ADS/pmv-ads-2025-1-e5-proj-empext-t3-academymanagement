import { IFormProps } from '../types/formProps';

export const generateDefaultValues = (
	editSubscriptions?: IFormProps['editSubscriptions'],
) => ({
	id: editSubscriptions?.id || undefined,
	user_id: editSubscriptions?.user_id || undefined,
	cost: editSubscriptions?.cost || undefined,
	recorrency: editSubscriptions?.recorrency || undefined,
	status: editSubscriptions?.status || undefined,
});
