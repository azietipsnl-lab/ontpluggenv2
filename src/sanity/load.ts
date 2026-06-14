import { sanityClient } from 'sanity:client';

/**
 * Run a GROQ query against the configured Sanity dataset.
 * Thin wrapper around the integration's client for ergonomic, typed fetches.
 *
 * @example
 *   const posts = await loadQuery<Post[]>(postsQuery);
 *   const page = await loadQuery<Page>(pageBySlugQuery, { slug });
 */
export async function loadQuery<T = unknown>(
	query: string,
	params: Record<string, unknown> = {}
): Promise<T> {
	return sanityClient.fetch<T>(query, params);
}
