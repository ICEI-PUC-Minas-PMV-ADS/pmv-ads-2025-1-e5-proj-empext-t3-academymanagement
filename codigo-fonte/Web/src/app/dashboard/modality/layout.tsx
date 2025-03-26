import type { Metadata } from 'next';
import { metadataModality } from '../../../interfaces/pages/modality/metadata';

export const metadata: Metadata = metadataModality;

export default function ModalityLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
