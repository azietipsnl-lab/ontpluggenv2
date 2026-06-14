// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
	process.env.NODE_ENV ?? 'development',
	process.cwd(),
	''
);

// https://astro.build/config
export default defineConfig({
	integrations: [
		sanity({
			projectId: PUBLIC_SANITY_PROJECT_ID,
			dataset: PUBLIC_SANITY_DATASET || 'production',
			// Use the CDN in production for fast, cached reads.
			useCdn: true,
			apiVersion: '2024-12-01',
			// Serves the embedded Studio at /studio
			studioBasePath: '/studio',
		}),
		react(),
	],
});
