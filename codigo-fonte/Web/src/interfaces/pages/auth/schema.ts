import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.required('Por favor, informe o seu endereço de email para prosseguir.')
		.email(
			'Email inválido! Por favor, informe um email válido para prosseguir.',
		),

	password: Yup.string().required(
		'Por favor, informe sua senha para prosseguir.',
	),
});
