import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? "/ENAPINEX" : undefined,
  assetPrefix: isGithubPages ? "/ENAPINEX/" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/ENAPINEX" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
