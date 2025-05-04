import * as Yup from 'yup';

export const BodyMeasurementSchema = (isFormEdit: boolean) =>
	Yup.object().shape({
		id: isFormEdit
			? Yup.string().required('É necessário informar o ID para edição')
			: Yup.string().notRequired(),

		height: Yup.number()
			.typeError('Informe um valor numérico')
			.required('Informe a altura')
			.min(1.3, 'Altura mínima é 1.30m')
			.max(2.2, 'Altura máxima é 2.50m'),

		weight: Yup.number()
			.typeError('Informe um valor numérico')
			.required('Informe o peso')
			.min(30, 'Peso mínimo é 30kg')
			.max(200, 'Peso máximo é 200kg'),

		waist: Yup.number()
			.typeError('Informe um valor numérico')
			.required('Informe a medida da cintura')
			.min(40, 'Cintura mínima é 40cm')
			.max(160, 'Cintura máxima é 160cm'),

		hip: Yup.number()
			.typeError('Informe um valor numérico')
			.required('Informe a medida do quadril')
			.min(50, 'Quadril mínimo é 50cm')
			.max(180, 'Quadril máximo é 180cm'),

		body_fat: Yup.number()
			.typeError('Informe um valor numérico')
			.required('Informe o percentual de gordura corporal')
			.min(5, 'Mínimo de gordura corporal é 5%')
			.max(50, 'Máximo de gordura corporal é 50%'),

		bmi: Yup.number()
			.typeError('Informe um valor numérico')
			.required('Informe o IMC')
			.min(10, 'IMC mínimo é 10')
			.max(60, 'IMC máximo é 60'),

		user_id: Yup.string().required(
			'É necessário selecionar o aluno vinculado',
		),
	});
