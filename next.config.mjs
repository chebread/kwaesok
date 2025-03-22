/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    additionalData: `$var: red;`,
  },
  devIndicators: false,
};

export default nextConfig;
