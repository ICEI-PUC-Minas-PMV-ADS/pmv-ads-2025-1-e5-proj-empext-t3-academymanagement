import type { Metadata } from 'next';
import { metadataFrequencies } from '../../../interfaces/pages/frequencies/metadata';

export const metadata: Metadata = metadataFrequencies;

export default function FrequenciesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
