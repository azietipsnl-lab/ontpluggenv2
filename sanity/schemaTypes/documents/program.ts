import { defineField, defineType } from 'sanity';

export const program = defineType({
	name: 'program',
	title: 'Program',
	type: 'document',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'details', title: 'Details' },
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
			name: 'summary',
			title: 'Summary',
			type: 'text',
			rows: 3,
			group: 'content',
			description: 'One- or two-sentence overview shown in listings.',
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
			title: 'Full description',
			type: 'blockContent',
			group: 'content',
		}),
		defineField({
			name: 'level',
			title: 'Level',
			type: 'string',
			group: 'details',
			options: {
				list: [
					{ title: 'Beginner', value: 'beginner' },
					{ title: 'Intermediate', value: 'intermediate' },
					{ title: 'Advanced', value: 'advanced' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'duration',
			title: 'Duration',
			type: 'string',
			group: 'details',
			description: 'e.g. "4 weken" or "7 dagen".',
		}),
		defineField({
			name: 'price',
			title: 'Price (EUR)',
			type: 'number',
			group: 'details',
			description: 'Leave empty for free programs.',
			validation: (rule) => rule.min(0),
		}),
		defineField({
			name: 'seo',
			title: 'SEO',
			type: 'seo',
			group: 'seo',
		}),
	],
	preview: {
		select: { title: 'title', subtitle: 'duration', media: 'coverImage' },
	},
});
