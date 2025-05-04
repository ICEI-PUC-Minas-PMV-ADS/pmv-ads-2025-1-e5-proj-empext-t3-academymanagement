import type { Metadata } from 'next';
import { metadataBodyMeasurement } from '../../../interfaces/pages/bodyMeasurement/metadata';

export const metadata: Metadata = metadataBodyMeasurement;

export default function BodyMeasurementLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
