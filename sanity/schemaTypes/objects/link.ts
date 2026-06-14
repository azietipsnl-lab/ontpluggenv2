import { defineField, defineType } from 'sanity';

/** A navigation link: external URL or internal reference. */
export const link = defineType({
	name: 'link',
	title: 'Link',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'internal',
			title: 'Internal page',
			type: 'reference',
			to: [{ type: 'page' }, { type: 'post' }, { type: 'program' }],
			description: 'Link to a document in this project.',
		}),
		defineField({
			name: 'href',
			title: 'External URL',
			type: 'url',
			description: 'Used only when no internal page is selected.',
			validation: (rule) =>
				rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
		}),
	],
	preview: {
		select: { title: 'label', internal: 'internal.title', href: 'href' },
		prepare({ title, internal, href }) {
			return { title, subtitle: internal ?? href ?? 'No destination' };
		},
	},
});
