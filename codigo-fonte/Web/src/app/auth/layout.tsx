import type { Metadata } from 'next';
import { AuthSectionLayout } from '../../interfaces/layouts/authSection';
import { metadataLogin } from '../../interfaces/pages/auth/metadata';

export const metadata: Metadata = metadataLogin;

export default function ForbiddenLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AuthSectionLayout>{children}</AuthSectionLayout>;
}
