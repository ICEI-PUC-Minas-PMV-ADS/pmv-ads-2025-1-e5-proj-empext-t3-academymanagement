import type { Metadata } from 'next';
import { metadataClass } from '../../../interfaces/pages/class/metadata';

export const metadata: Metadata = metadataClass;

export default function ClassLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
