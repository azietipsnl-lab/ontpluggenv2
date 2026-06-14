// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SITE_URL } =
	loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	site: PUBLIC_SITE_URL || 'http://localhost:4321',
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
		sitemap({
			// Keep the editing UI out of the public sitemap.
			filter: (page) => !page.includes('/studio'),
		}),
	],
});
