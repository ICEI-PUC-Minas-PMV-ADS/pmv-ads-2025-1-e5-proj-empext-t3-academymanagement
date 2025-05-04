'use client';

import { useEffect, useState } from 'react';
import { IPaymentHistoryEntity } from '../../../../domain/entities/IPaymentHistoryEntity';
import { usePaymentHistoryRepository } from '../../../../infrastructure/repositories/paymentHistory';
import { PaymentHistoryForm } from '../../../../interfaces/pages/paymentHistory/form';
import { IFormPageProps } from '../../../../interfaces/pages/paymentHistory/form/types/IFormPageProps';
import Loading from '../../../loading';

export default function PaymentHistoryEditPage({ params }: IFormPageProps) {
	const { paymentHistoryId } = params;
	const paymentHistoryRepository = usePaymentHistoryRepository();

	const [editPaymentHistory, setPaymentHistoryEdit] = useState<
		IPaymentHistoryEntity | undefined
	>(undefined);

	const getDataPage = async () => {
		const response = await paymentHistoryRepository.getById(
			paymentHistoryId!,
		);

		if (response.success) setPaymentHistoryEdit(response.data);
		else setPaymentHistoryEdit(undefined);
	};

	useEffect(() => {
		getDataPage();
	}, []);

	return editPaymentHistory ? (
		<PaymentHistoryForm editPaymentHistory={editPaymentHistory} />
	) : (
		<Loading />
	);
}
