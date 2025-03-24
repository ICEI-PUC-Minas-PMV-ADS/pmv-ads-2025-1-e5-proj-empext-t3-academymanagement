import { AuthGuard } from '../../interfaces/layouts/authGuard';
import { Dashboard } from '../../interfaces/layouts/dashboard';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthGuard>
			<Dashboard>{children}</Dashboard>
		</AuthGuard>
	);
}
