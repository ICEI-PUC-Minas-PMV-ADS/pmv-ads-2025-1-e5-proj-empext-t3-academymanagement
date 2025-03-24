import type { Metadata } from 'next';
import { metadataNotFound } from '../../../interfaces/pages/notFound/metadata';

export const metadata: Metadata = metadataNotFound;

export default function NotFoundLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
