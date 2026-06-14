import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site settings',
	type: 'document',
	groups: [
		{ name: 'general', title: 'General', default: true },
		{ name: 'navigation', title: 'Navigation' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Site title',
			type: 'string',
			group: 'general',
			initialValue: 'Ontpluggen',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Tagline / description',
			type: 'text',
			rows: 2,
			group: 'general',
		}),
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			group: 'general',
		}),
		defineField({
			name: 'primaryNav',
			title: 'Primary navigation',
			type: 'array',
			of: [{ type: 'link' }],
			group: 'navigation',
		}),
		defineField({
			name: 'footerNav',
			title: 'Footer navigation',
			type: 'array',
			of: [{ type: 'link' }],
			group: 'navigation',
		}),
		defineField({
			name: 'social',
			title: 'Social links',
			type: 'array',
			group: 'navigation',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'platform', title: 'Platform', type: 'string' },
						{
							name: 'url',
							title: 'URL',
							type: 'url',
							validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
						},
					],
					preview: { select: { title: 'platform', subtitle: 'url' } },
				},
			],
		}),
		defineField({
			name: 'seo',
			title: 'Default SEO',
			type: 'seo',
			group: 'seo',
		}),
	],
	preview: {
		prepare: () => ({ title: 'Site settings' }),
	},
});
