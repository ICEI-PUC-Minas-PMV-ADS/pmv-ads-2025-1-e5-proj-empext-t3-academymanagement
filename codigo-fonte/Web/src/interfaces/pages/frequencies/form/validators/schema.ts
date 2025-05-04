import * as Yup from 'yup';

export const FrequenciesSchema = (isFormEdit: boolean) =>
	Yup.object().shape({
		id: isFormEdit
			? Yup.string().required('É necessário informar o ID para edição')
			: Yup.string(),
	});
