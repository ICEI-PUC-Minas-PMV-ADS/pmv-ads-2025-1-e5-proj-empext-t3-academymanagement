import * as Yup from 'yup';

export const PaymentHistorySchema = (isFormEdit: boolean) =>
	Yup.object().shape({
		id: isFormEdit
			? Yup.string().required('É necessário informar o ID para edição')
			: Yup.string(),
	});
