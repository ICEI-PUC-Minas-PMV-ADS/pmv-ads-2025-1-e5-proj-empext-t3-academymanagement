import type { Metadata } from 'next';
import { metadataEnrollment } from '../../../interfaces/pages/enrollment/metadata';

export const metadata: Metadata = metadataEnrollment;

export default function EnrollmentLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
