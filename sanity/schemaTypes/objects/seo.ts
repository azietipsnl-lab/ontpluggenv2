import { defineField, defineType } from 'sanity';

export const seo = defineType({
	name: 'seo',
	title: 'SEO',
	type: 'object',
	options: { collapsible: true, collapsed: true },
	fields: [
		defineField({
			name: 'metaTitle',
			title: 'Meta title',
			type: 'string',
			description: 'Overrides the default page title in search results (~60 chars).',
			validation: (rule) => rule.max(60).warning('Shorter titles display better.'),
		}),
		defineField({
			name: 'metaDescription',
			title: 'Meta description',
			type: 'text',
			rows: 3,
			description: 'Summary for search engines and social shares (~155 chars).',
			validation: (rule) =>
				rule.max(160).warning('Keep under ~155 characters.'),
		}),
		defineField({
			name: 'ogImage',
			title: 'Social share image',
			type: 'image',
			description: 'Recommended 1200×630.',
		}),
		defineField({
			name: 'noIndex',
			title: 'Hide from search engines',
			type: 'boolean',
			initialValue: false,
		}),
	],
});
