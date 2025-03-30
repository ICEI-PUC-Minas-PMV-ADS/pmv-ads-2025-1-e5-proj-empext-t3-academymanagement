import * as Yup from 'yup';

export const UserSchema = (isFormEdit: boolean) =>
	Yup.object().shape({
		id: isFormEdit
			? Yup.string().required('É necessário informar o ID para edição')
			: Yup.string(),

		name: Yup.string().required('Informe o nome do usuário'),

		email: Yup.string()
			.email('Informe um e-mail válido')
			.required('Informe o e-mail do usuário'),

		password: isFormEdit
			? Yup.string()
			: Yup.string()
				.required('Informe a senha do usuário')
				.min(10, 'A senha deve conter no mínimo 10 caracteres')
				.max(16, 'A senha deve conter no máximo 16 caracteres')
				.matches(
					/[A-Z].*[A-Z]/,
					'A senha deve conter ao menos 2 letras maiúsculas',
				)
				.matches(
					/[a-z].*[a-z].*[a-z]/,
					'A senha deve conter ao menos 3 letras minúsculas',
				)
				.matches(
					/[0-9].*[0-9]/,
					'A senha deve conter ao menos 2 números',
				)
				.matches(
					/[@#$%&]/,
					'A senha deve conter ao menos 1 caractere especial: @#$%&',
				),
	});
