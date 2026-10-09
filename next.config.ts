import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["*.trycloudflare.com"],
  ...(githubPages
    ? {
        output: "export" as const,
        basePath: "/kuberpay",
        trailingSlash: true,
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
