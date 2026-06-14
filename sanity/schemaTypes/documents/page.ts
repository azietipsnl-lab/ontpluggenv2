import { defineField, defineType } from 'sanity';

export const page = defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'content',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			group: 'content',
			options: { source: 'title', maxLength: 96 },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'heading',
			title: 'Hero heading',
			type: 'string',
			group: 'content',
			description: 'Overrides the title as the on-page H1 when set.',
		}),
		defineField({
			name: 'subheading',
			title: 'Hero subheading',
			type: 'text',
			rows: 3,
			group: 'content',
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
			group: 'content',
		}),
		defineField({
			name: 'seo',
			title: 'SEO',
			type: 'seo',
			group: 'seo',
		}),
	],
	preview: {
		select: { title: 'title', slug: 'slug.current' },
		prepare({ title, slug }) {
			return { title, subtitle: slug ? `/${slug}` : 'No slug' };
		},
	},
});
