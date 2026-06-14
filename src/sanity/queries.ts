import groq from 'groq';

/** Reusable projections */
const imageFields = /* groq */ `
	"url": asset->url,
	"alt": coalesce(alt, ""),
	"lqip": asset->metadata.lqip,
	"dimensions": asset->metadata.dimensions
`;

const seoFields = /* groq */ `
	metaTitle,
	metaDescription,
	"ogImage": ogImage{ ${imageFields} },
	noIndex
`;

/* ---------------- Site settings (singleton) ---------------- */

export const siteSettingsQuery = groq`
	*[_type == "siteSettings"][0]{
		title,
		description,
		"logo": logo{ ${imageFields} },
		primaryNav[]{ label, href, "internal": internal->{ _type, "slug": slug.current } },
		footerNav[]{ label, href, "internal": internal->{ _type, "slug": slug.current } },
		social[]{ platform, url },
		seo{ ${seoFields} }
	}
`;

/* ---------------- Pages ---------------- */

export const pageBySlugQuery = groq`
	*[_type == "page" && slug.current == $slug][0]{
		title, heading, subheading, body,
		"slug": slug.current,
		seo{ ${seoFields} }
	}
`;

export const pageSlugsQuery = groq`
	*[_type == "page" && defined(slug.current)].slug.current
`;

/* ---------------- Articles ---------------- */

export const postsQuery = groq`
	*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
		title, excerpt, publishedAt,
		"slug": slug.current,
		"coverImage": coverImage{ ${imageFields} },
		"author": author->{ name, "slug": slug.current },
		"categories": categories[]->{ title, "slug": slug.current }
	}
`;

export const postBySlugQuery = groq`
	*[_type == "post" && slug.current == $slug][0]{
		title, excerpt, body, publishedAt,
		"slug": slug.current,
		"coverImage": coverImage{ ${imageFields} },
		"author": author->{ name, bio, "slug": slug.current, "image": image{ ${imageFields} } },
		"categories": categories[]->{ title, "slug": slug.current },
		seo{ ${seoFields} }
	}
`;

export const postSlugsQuery = groq`
	*[_type == "post" && defined(slug.current)].slug.current
`;

export const postsByCategoryQuery = groq`
	*[_type == "post" && defined(slug.current) && $slug in categories[]->slug.current]
		| order(publishedAt desc){
		title, excerpt, publishedAt,
		"slug": slug.current,
		"coverImage": coverImage{ ${imageFields} },
		"author": author->{ name, "slug": slug.current },
		"categories": categories[]->{ title, "slug": slug.current }
	}
`;

/* ---------------- Categories ---------------- */

// Only categories that have at least one published post, with post counts.
export const categoriesQuery = groq`
	*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0]
		| order(title asc){
		title,
		"slug": slug.current,
		"count": count(*[_type == "post" && references(^._id)])
	}
`;

export const categoryBySlugQuery = groq`
	*[_type == "category" && slug.current == $slug][0]{
		title, description, "slug": slug.current
	}
`;

export const categorySlugsQuery = groq`
	*[_type == "category" && defined(slug.current) && count(*[_type == "post" && references(^._id)]) > 0].slug.current
`;

/* ---------------- Programs ---------------- */

export const programsQuery = groq`
	*[_type == "program" && defined(slug.current)] | order(title asc){
		title, summary, level, duration, price,
		"slug": slug.current,
		"coverImage": coverImage{ ${imageFields} }
	}
`;

export const programBySlugQuery = groq`
	*[_type == "program" && slug.current == $slug][0]{
		title, summary, body, level, duration, price,
		"slug": slug.current,
		"coverImage": coverImage{ ${imageFields} },
		seo{ ${seoFields} }
	}
`;

export const programSlugsQuery = groq`
	*[_type == "program" && defined(slug.current)].slug.current
`;
