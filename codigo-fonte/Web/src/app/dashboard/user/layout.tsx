import type { Metadata } from 'next';
import { metadataUser } from '../../../interfaces/pages/user/metadata';

export const metadata: Metadata = metadataUser;

export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
