/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "api.dicebear.com", pathname: "/avatars/**" },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "files.edgestore.dev", protocol: "https" },
      { hostname: "media.tenor.com", protocol: "https" },
      { hostname: "media1.tenor.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
