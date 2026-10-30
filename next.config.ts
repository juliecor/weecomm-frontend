import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev-only "N" badge would sit on the dashboard sidebar's account card.
  devIndicators: { position: "bottom-right" },
  // Photos, site plans and a realty's five accreditation documents (10 MB each) go through server actions, which allow only 1 MB by default.
  experimental: { serverActions: { bodySizeLimit: "60mb" } },
  images: {
    // Photos are resized to the size they're shown at (components/photo.tsx): the site's own files.
    remotePatterns: [],
    qualities: [75],
  },
  async redirects() {
    return [
      // The site is Wee Comm's own: the landing is at /. Their old WordPress addresses keep working.
      { source: "/weecomm", destination: "/", permanent: true },
      { source: "/our-communities-page", destination: "/projects", permanent: true },
      { source: "/ourcommunities-page", destination: "/projects", permanent: true },
      { source: "/contact-us", destination: "/#inquire", permanent: true },
      { source: "/partner-with-us", destination: "/#partners", permanent: true },
      { source: "/faqs", destination: "/buyers-guide", permanent: true },
      { source: "/about-us", destination: "/#story", permanent: true },
    ];
  },
};

export default nextConfig;
