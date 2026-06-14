interface ImportMetaEnv {
	readonly PUBLIC_SANITY_PROJECT_ID: string;
	readonly PUBLIC_SANITY_DATASET: string;
	readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Virtual module provided by @sanity/astro at build time.
declare module 'sanity:client' {
	import type { SanityClient } from '@sanity/client';
	export const sanityClient: SanityClient;
}
