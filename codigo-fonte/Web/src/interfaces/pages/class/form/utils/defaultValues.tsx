import { IFormProps } from '../types/formProps';

export const generateDefaultValues = (editClass?: IFormProps['editClass']) => ({
	id: editClass?.id || undefined,
	name: editClass?.name || '',
	maximum: editClass?.maximum || 1
});
