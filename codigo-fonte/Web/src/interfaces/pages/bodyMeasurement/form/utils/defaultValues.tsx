import { IFormProps } from '../types/formProps';

export const generateDefaultValues = (
	editBodyMeasurement?: IFormProps['editBodyMeasurement'],
) => ({
	id: editBodyMeasurement?.id || undefined,
	height: editBodyMeasurement?.height ?? '',
	weight: editBodyMeasurement?.weight ?? '',
	waist: editBodyMeasurement?.waist ?? '',
	hip: editBodyMeasurement?.hip ?? '',
	body_fat: editBodyMeasurement?.body_fat ?? '',
	bmi: editBodyMeasurement?.bmi ?? '',
	user_id: editBodyMeasurement?.user_id ?? '',
});
