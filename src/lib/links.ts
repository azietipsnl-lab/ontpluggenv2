import type { InternalRef, NavLink } from '../sanity/types';

/** Map an internal document reference to its public route. */
export function hrefForInternal(internal?: InternalRef | null): string | null {
	if (!internal?.slug) return null;
	switch (internal._type) {
		case 'page':
			return internal.slug === 'home' ? '/' : `/${internal.slug}`;
		case 'post':
			return `/blog/${internal.slug}`;
		case 'program':
			return `/programs/${internal.slug}`;
		default:
			return `/${internal.slug}`;
	}
}

/** Resolve a nav link to a URL — internal reference wins over a raw URL. */
export function resolveNavLink(link: NavLink): string {
	return hrefForInternal(link.internal) ?? link.href ?? '#';
}

/** True for links that leave the site (used to set target/rel). */
export function isExternal(href: string): boolean {
	return /^https?:\/\//.test(href);
}
