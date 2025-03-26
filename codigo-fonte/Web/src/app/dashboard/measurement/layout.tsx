import type { Metadata } from 'next';
import { metadataMeasurement } from '../../../interfaces/pages/measurement/metadata';

export const metadata: Metadata = metadataMeasurement;

export default function MeasurementLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
