import * as Yup from 'yup';

export const ClassSchema = (isFormEdit: boolean) =>
	Yup.object().shape({
		id: isFormEdit
			? Yup.string().required('É necessário informar o ID para edição')
			: Yup.string(),

		name: Yup.string().required('Informe o nome da classe'),

		maximum: Yup.number()
			.min(1, 'O valor deve ser maior que 0')
			.max(999999999 , 'O valor inserido é muito alto')
			.required('Informe a quantidade máxima de estudantes para a sala'),

	});
