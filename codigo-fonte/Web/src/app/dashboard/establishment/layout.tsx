import type { Metadata } from 'next';
import { metadataEstablishment } from '../../../interfaces/pages/establishment/metadata';

export const metadata: Metadata = metadataEstablishment;

export default function EstablishmentLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
