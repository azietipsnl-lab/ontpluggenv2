import { defineField, defineType } from 'sanity';

export const post = defineType({
	name: 'post',
	title: 'Article',
	type: 'document',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'meta', title: 'Meta' },
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
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 3,
			group: 'content',
			description: 'Short summary shown in listings and social shares.',
			validation: (rule) => rule.max(300),
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover image',
			type: 'image',
			group: 'content',
			options: { hotspot: true },
			fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
			group: 'content',
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'author' }],
			group: 'meta',
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'category' }] }],
			group: 'meta',
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			group: 'meta',
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'seo',
			title: 'SEO',
			type: 'seo',
			group: 'seo',
		}),
	],
	orderings: [
		{
			title: 'Published, newest first',
			name: 'publishedDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
	],
	preview: {
		select: { title: 'title', author: 'author.name', media: 'coverImage' },
		prepare({ title, author, media }) {
			return { title, subtitle: author ? `by ${author}` : undefined, media };
		},
	},
});
