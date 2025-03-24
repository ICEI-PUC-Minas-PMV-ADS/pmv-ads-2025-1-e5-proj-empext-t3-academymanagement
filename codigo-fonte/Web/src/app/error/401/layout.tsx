import type { Metadata } from 'next';
import { metadataUnauthorized } from '../../../interfaces/pages/unauthorized/metadata';

export const metadata: Metadata = metadataUnauthorized;

export default function UnauthorizedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
