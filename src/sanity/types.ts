import type { PortableTextBlock } from '@portabletext/types';

export interface SanityImage {
	url: string;
	alt: string;
	lqip?: string;
	dimensions?: { width: number; height: number; aspectRatio: number };
}

export interface SeoData {
	metaTitle?: string;
	metaDescription?: string;
	ogImage?: SanityImage;
	noIndex?: boolean;
}

export interface InternalRef {
	_type: string;
	slug: string;
}

export interface NavLink {
	label: string;
	href?: string;
	internal?: InternalRef | null;
}

export interface SocialLink {
	platform: string;
	url: string;
}

export interface SiteSettings {
	title?: string;
	description?: string;
	logo?: SanityImage;
	primaryNav?: NavLink[];
	footerNav?: NavLink[];
	social?: SocialLink[];
	seo?: SeoData;
}

export interface Category {
	title: string;
	slug: string;
	description?: string;
	count?: number;
}

export interface PageDoc {
	title: string;
	heading?: string;
	subheading?: string;
	body?: PortableTextBlock[];
	slug: string;
	seo?: SeoData;
}

export interface PostListItem {
	title: string;
	excerpt?: string;
	publishedAt: string;
	slug: string;
	coverImage?: SanityImage;
	author?: { name: string; slug: string } | null;
	categories?: { title: string; slug: string }[];
}

export interface PostDoc extends Omit<PostListItem, 'author'> {
	body?: PortableTextBlock[];
	author?: {
		name: string;
		bio?: string;
		slug: string;
		image?: SanityImage;
	} | null;
	seo?: SeoData;
}

export interface ProgramListItem {
	title: string;
	summary?: string;
	level?: 'beginner' | 'intermediate' | 'advanced';
	duration?: string;
	price?: number;
	slug: string;
	coverImage?: SanityImage;
}

export interface ProgramDoc extends ProgramListItem {
	body?: PortableTextBlock[];
	seo?: SeoData;
}
