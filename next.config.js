/** @type {import('next').NextConfig} */
// innovation.ia
const nextConfig = {
	images: {
		domains: [
			"oaidalleapiprodscus.blob.core.windows.net",
			"replicate.delivery",
			"pbxt.replicate.delivery",
		],
	},
	async rewrites() {
		return [
			{
				source: "/__clerk/:path*",
				destination: "https://clerk.app-innovation-25oc-javierandres751-5414s-projects.vercel.app/:path*",
			},
		];
	},
};

module.exports = nextConfig;
