import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  turbopack: {},
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
