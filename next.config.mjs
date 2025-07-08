/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  fallbacks: {
    document: "/~offline",
  },
});

const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }
    return config;
  },
};

export default withPWA(nextConfig);
