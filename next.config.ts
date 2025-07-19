import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value:
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; object-src 'none'; base-uri 'self'; frame-src 'self'",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.devtool = "hidden-source-map";
    }
    return config;
  },
};

export default nextConfig;
