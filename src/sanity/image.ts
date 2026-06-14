import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from 'sanity:client';

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build a Sanity image URL.
 * @example urlFor(post.coverImage).width(1200).height(630).url()
 */
export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
