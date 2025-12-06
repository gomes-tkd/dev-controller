import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
