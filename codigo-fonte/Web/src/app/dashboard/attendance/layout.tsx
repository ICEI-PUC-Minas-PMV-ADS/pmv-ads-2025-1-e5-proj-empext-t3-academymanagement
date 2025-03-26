import type { Metadata } from 'next';
import { metadataAttendance } from '../../../interfaces/pages/attendance/metadata';

export const metadata: Metadata = metadataAttendance;

export default function AttendanceLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
