import type { NextConfig } from "next";
import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // token, // for private datasets
  apiVersion: "2024-11-01",
  useCdn: true,
});

const nextConfig: NextConfig = {
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: "false",
  },
  async redirects() {
    return await client.fetch(groq`*[_type == 'redirect']{
			source,
			destination,
			permanent
		}`);
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;