'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingScreen } from '../interfaces/components/loading/screen';
import { Routes } from './routes';

export default function NotFoundPage() {
	const router = useRouter();

	useEffect(() => {
		router.push(Routes.notFound);
	}, [router]);

	return <LoadingScreen />;
}
