/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
		domains: [
			"res.cloudinary.com",
			"avatars.githubusercontent.com",
			"lh3.googleusercontent.com",
			"plus.unsplash.com",
			"is.vnecdn.net",
			"cdn.okchoi.com",
			"zq.titan007.com",
			"blogger.googleusercontent.com",
			"png.pngtree.com",
			"apiv2.allsportsapi.com",
		],
	},
	remotePatterns: [
		{
			protocol: "https",
			hostname: "**",
		},
	],
};

module.exports = nextConfig;
