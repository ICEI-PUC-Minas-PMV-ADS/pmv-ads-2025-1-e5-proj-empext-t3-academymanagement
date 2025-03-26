import type { Metadata } from 'next';
import { metadataInstructor } from '../../../interfaces/pages/instructor/metadata';

export const metadata: Metadata = metadataInstructor;

export default function InstructorLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
