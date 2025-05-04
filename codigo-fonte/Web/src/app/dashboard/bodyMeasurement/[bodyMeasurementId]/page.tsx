'use client';

import { useEffect, useState } from 'react';
import { IBodyMeasurementEntity } from '../../../../domain/entities/IBodyMeasurementEntity';
import { useBodyMeasurementRepository } from '../../../../infrastructure/repositories/bodyMeasurement';
import { BodyMeasurementForm } from '../../../../interfaces/pages/bodyMeasurement/form';
import { IFormPageProps } from '../../../../interfaces/pages/bodyMeasurement/form/types/IFormPageProps';
import Loading from '../../../loading';

export default function BodyMeasurementEditPage({ params }: IFormPageProps) {
	const { bodyMeasurementId } = params;
	const bodyMeasurementRepository = useBodyMeasurementRepository();

	const [editBodyMeasurement, setEditBodyMeasurement] = useState<
		IBodyMeasurementEntity | undefined
	>(undefined);

	const getDataPage = async () => {
		const response = await bodyMeasurementRepository.getById(
			bodyMeasurementId!,
		);

		if (response.success) setEditBodyMeasurement(response.data);
		else setEditBodyMeasurement(undefined);
	};

	useEffect(() => {
		getDataPage();
	}, []);

	return editBodyMeasurement ? (
		<BodyMeasurementForm editBodyMeasurement={editBodyMeasurement} />
	) : (
		<Loading />
	);
}
