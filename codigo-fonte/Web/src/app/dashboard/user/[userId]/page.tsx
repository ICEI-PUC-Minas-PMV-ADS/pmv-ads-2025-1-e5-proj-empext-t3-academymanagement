'use client';

import { useEffect, useState } from 'react';
import { IUserEntity } from '../../../../domain/entities/IUserEntity';
import { useUserRepository } from '../../../../infrastructure/repositories/user';
import { UserForm } from '../../../../interfaces/pages/user/form';
import { IFormPageProps } from '../../../../interfaces/pages/user/form/types/IFormPageProps';
import Loading from '../../../loading';

export default function UserEditPage({ params }: IFormPageProps) {
	const { userId } = params;
	const userRepository = useUserRepository();

	const [editUser, setEditUser] = useState<IUserEntity | undefined>(
		undefined,
	);

	const getDataPage = async () => {
		const responseData = await userRepository.getById(userId!);

		if (responseData) setEditUser(responseData);
		else setEditUser(undefined);
	};

	useEffect(() => {
		getDataPage();
	}, []);

	return editUser ? <UserForm editUser={editUser} /> : <Loading />;
}
