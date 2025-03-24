/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	compiler: {
		styledComponents: true,
	},
};

export default nextConfig;
