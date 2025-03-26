import type { Metadata } from 'next';
import { metadataSubscription } from '../../../interfaces/pages/subscription/metadata';

export const metadata: Metadata = metadataSubscription;

export default function SubscriptionLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
