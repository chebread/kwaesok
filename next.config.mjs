/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  sassOptions: {
    additionalData: `$var: red;`,
  },
  devIndicators: false,
};

export default nextConfig;
