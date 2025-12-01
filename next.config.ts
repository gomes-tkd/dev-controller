import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com", // Para Google
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com", // Para GitHub
            },
        ],
    },
};

export default nextConfig;
