import type { Metadata } from 'next';
import { metadataDashboard } from '../../../interfaces/pages/dashboard/metadata';

export const metadata: Metadata = metadataDashboard;

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
