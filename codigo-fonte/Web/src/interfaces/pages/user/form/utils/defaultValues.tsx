import { IFormProps } from '../types/formProps';

export const generateDefaultValues = (editUser?: IFormProps['editUser']) => ({
	id: editUser?.id || undefined,
	name: editUser?.name || '',
	email: editUser?.email || '',
	password: '',
	type: editUser?.type || 'STUDENT',
	classes: editUser?.classes?.map((c) => c.classe.id) || [],
});
