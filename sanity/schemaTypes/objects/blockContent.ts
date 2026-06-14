import { defineArrayMember, defineType } from 'sanity';

/**
 * Rich text (Portable Text) used across documents.
 * Restrained styles to match the minimalist design system.
 */
export const blockContent = defineType({
	name: 'blockContent',
	title: 'Content',
	type: 'array',
	of: [
		defineArrayMember({
			type: 'block',
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'Heading 2', value: 'h2' },
				{ title: 'Heading 3', value: 'h3' },
				{ title: 'Quote', value: 'blockquote' },
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' },
				{ title: 'Numbered', value: 'number' },
			],
			marks: {
				decorators: [
					{ title: 'Emphasis', value: 'em' },
					{ title: 'Strong', value: 'strong' },
				],
				annotations: [
					{
						name: 'link',
						title: 'Link',
						type: 'object',
						fields: [
							{
								name: 'href',
								title: 'URL',
								type: 'url',
								validation: (rule) =>
									rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
							},
						],
					},
				],
			},
		}),
		defineArrayMember({
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Important for accessibility and SEO.',
				},
			],
		}),
	],
});
