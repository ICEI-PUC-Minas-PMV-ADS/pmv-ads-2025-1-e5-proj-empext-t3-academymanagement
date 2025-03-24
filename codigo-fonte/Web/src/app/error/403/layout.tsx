import type { Metadata } from 'next';
import { metadataForbiden } from '../../../interfaces/pages/forbidden/metadata';

export const metadata: Metadata = metadataForbiden;

export default function ForbiddenLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
