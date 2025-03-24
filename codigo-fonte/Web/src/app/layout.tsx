import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import manifest from '../../public/manifest/manifest.json';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: manifest.name,
	description: manifest.description,
	robots: 'noindex, nofollow',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang={manifest.lang}>
			<head>
				<meta httpEquiv='cache-control' content='no-cache' />
				<meta httpEquiv='expires' content='0' />
				<meta httpEquiv='pragma' content='no-cache' />

				<meta name='description' content={manifest.description} />

				<link rel='icon' href='/favicon/favicon.ico' />
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/favicon/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon/favicon-16x16.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='192x192'
					href='/favicon/icon-192x192.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='512x512'
					href='/favicon/icon-512x512.png'
				/>
				<link rel='manifest' href='/manifest/manifest.json' />

				<script
					src='https://kit.fontawesome.com/db6a3a0efb.js'
					crossOrigin='anonymous'
					async
				/>
			</head>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
