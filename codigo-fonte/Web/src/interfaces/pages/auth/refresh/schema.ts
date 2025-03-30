import * as Yup from 'yup';

export const RefreshPasswordSchema = Yup.object().shape({
	password: Yup.string()
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
		.matches(/[0-9].*[0-9]/, 'A senha deve conter ao menos 2 números')
		.matches(
			/[@#$%&]/,
			'A senha deve conter ao menos 1 caractere especial: @#$%&',
		),
	repeatPassword: Yup.string()
		.required('Confirme sua nova senha')
		.oneOf([Yup.ref('password')], 'As senhas não coincidem'),
});
