import type { Metadata } from 'next';
import { metadataPaymentHistory } from '../../../interfaces/pages/paymentHistory/metadata';

export const metadata: Metadata = metadataPaymentHistory;

export default function PaymentHistoryLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
