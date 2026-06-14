import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { loadQuery } from '../sanity/load';
import { postsQuery } from '../sanity/queries';
import type { PostListItem } from '../sanity/types';

export async function GET(context: APIContext) {
	let posts: PostListItem[] = [];
	try {
		posts = (await loadQuery<PostListItem[]>(postsQuery)) ?? [];
	} catch {
		posts = [];
	}

	// `context.site` comes from `site` in astro.config.mjs.
	const site = context.site ?? new URL('http://localhost:4321');

	return rss({
		title: 'Ontpluggen — Magazine',
		description:
			'Artikelen over bewuste technologie, rust en digitaal welzijn.',
		site,
		items: posts.map((post) => ({
			title: post.title,
			description: post.excerpt ?? '',
			link: `/blog/${post.slug}`,
			pubDate: post.publishedAt ? new Date(post.publishedAt) : undefined,
		})),
		customData: '<language>nl-nl</language>',
	});
}
