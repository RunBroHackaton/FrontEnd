/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  async exportPathMap(defaultPathMap) {
    delete defaultPathMap["/api/auth/[...nextauth]"];
    delete defaultPathMap["/api/files"];
    return defaultPathMap;
  },
};

export default nextConfig;
