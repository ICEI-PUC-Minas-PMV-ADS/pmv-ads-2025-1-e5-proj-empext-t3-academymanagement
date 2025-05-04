import { IFormProps } from '../types/formProps';

export const generateDefaultValues = (
	editFrequencies?: IFormProps['editFrequencies'],
) => ({
	id: editFrequencies?.id || undefined,
});
