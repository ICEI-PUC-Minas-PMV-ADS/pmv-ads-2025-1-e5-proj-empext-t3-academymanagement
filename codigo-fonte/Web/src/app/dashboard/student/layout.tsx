import type { Metadata } from 'next';
import { metadataStudent } from '../../../interfaces/pages/student/metadata';

export const metadata: Metadata = metadataStudent;

export default function StudentLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
