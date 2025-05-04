'use client';

import { useEffect, useState } from 'react';
import { IClasseEntity } from '../../../../domain/entities/IClasseEntity';
import { useClassRepository } from '../../../../infrastructure/repositories/class';
import { ClassForm } from '../../../../interfaces/pages/class/form';
import { IFormPageProps } from '../../../../interfaces/pages/class/form/types/IFormPageProps';
import Loading from '../../../loading';

export default function ClassEditPage({ params }: IFormPageProps) {
	const { classId } = params;
	const classRepository = useClassRepository();

	const [editClass, setEditClass] = useState<IClasseEntity | undefined>(
		undefined,
	);

	const getDataPage = async () => {
		const response = await classRepository.getById(classId!);

		if (response.success) setEditClass(response.data);
		else setEditClass(undefined);
	};

	useEffect(() => {
		getDataPage();
	}, []);

	return editClass ? <ClassForm editClass={editClass} /> : <Loading />;
}
