import * as Yup from 'yup';

export const UserSchema = (isFormEdit: boolean) =>
	Yup.object().shape({
		id: isFormEdit
			? Yup.string().required('É necessário informar o ID para edição')
			: Yup.string().notRequired(),

		name: Yup.string()
			.required('Informe o nome do usuário')
			.min(3, 'O nome deve ter no mínimo 3 caracteres')
			.max(100, 'O nome pode ter no máximo 100 caracteres'),

		email: Yup.string()
			.email('Informe um e-mail válido')
			.required('Informe o e-mail do usuário'),

		type: Yup.mixed<'STUDENT' | 'ADMIN'>()
			.oneOf(['STUDENT', 'ADMIN'], 'Tipo de usuário inválido')
			.required('Informe o tipo de usuário'),

		classes: Yup.array()
			.of(Yup.string().required())
			.min(1, 'Selecione ao menos uma classe de aula')
			.required('Selecione ao menos uma classe de aula'),

		password: isFormEdit
			? Yup.string().notRequired()
			: Yup.string()
				.required('Informe a senha do usuário')
				.min(10, 'A senha deve conter no mínimo 10 caracteres')
				.max(16, 'A senha deve conter no máximo 16 caracteres')
				.matches(
					/(?:.*[A-Z]){2,}/,
					'A senha deve conter ao menos 2 letras maiúsculas',
				)
				.matches(
					/(?:.*[a-z]){3,}/,
					'A senha deve conter ao menos 3 letras minúsculas',
				)
				.matches(
					/(?:.*[0-9]){2,}/,
					'A senha deve conter ao menos 2 números',
				)
				.matches(
					/[@#$%&]/,
					'A senha deve conter ao menos 1 caractere especial: @ # $ % &',
				),
	});
