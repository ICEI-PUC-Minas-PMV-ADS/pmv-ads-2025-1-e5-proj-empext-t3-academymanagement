'use client';

import { useEffect, useState } from 'react';
import { IFrequencyEntity } from '../../../../domain/entities/IFrequencyEntity';
import { useFrequencyRepository } from '../../../../infrastructure/repositories/frequency';
import { FrequenciesForm } from '../../../../interfaces/pages/frequencies/form';
import { IFormPageProps } from '../../../../interfaces/pages/user/form/types/IFormPageProps';
import Loading from '../../../loading';

export default function FrequenciesEditPage({ params }: IFormPageProps) {
	const { userId } = params;
	const frequencyRepository = useFrequencyRepository();

	const [editFrequencies, setFrequenciesEdit] = useState<
		IFrequencyEntity | undefined
	>(undefined);

	const getDataPage = async () => {
		const response = await frequencyRepository.getById(userId!);

		if (response.success) setFrequenciesEdit(response.data);
		else setFrequenciesEdit(undefined);
	};

	useEffect(() => {
		getDataPage();
	}, []);

	return editFrequencies ? (
		<FrequenciesForm editFrequencies={editFrequencies} />
	) : (
		<Loading />
	);
}
