import type { Metadata } from 'next';
import { metadataInternalError } from '../../../interfaces/pages/internalError/metadata';

export const metadata: Metadata = metadataInternalError;

export default function InternalErrorLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
