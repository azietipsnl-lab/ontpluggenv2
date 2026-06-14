import { defineConfig, type StructureResolver } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string;
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string) ?? 'production';

/** Singleton documents that should appear once, not as a creatable list. */
const SINGLETONS = [{ id: 'siteSettings', title: 'Site settings' }];
const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.id));

const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			// Singletons
			...SINGLETONS.map((singleton) =>
				S.listItem()
					.title(singleton.title)
					.id(singleton.id)
					.child(
						S.document().schemaType(singleton.id).documentId(singleton.id)
					)
			),
			S.divider(),
			// Regular collections
			S.documentTypeListItem('page').title('Pages'),
			S.documentTypeListItem('post').title('Articles'),
			S.documentTypeListItem('program').title('Programs'),
			S.divider(),
			S.documentTypeListItem('author').title('Authors'),
			S.documentTypeListItem('category').title('Categories'),
		]);

export default defineConfig({
	name: 'ontpluggen',
	title: 'Ontpluggen',
	projectId,
	dataset,
	plugins: [structureTool({ structure }), visionTool()],
	schema: {
		types: schemaTypes,
		// Hide singletons from the global "create new" menu.
		templates: (templates) =>
			templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
	},
	document: {
		// Remove "duplicate" / "delete" actions for singletons.
		actions: (input, context) =>
			SINGLETON_TYPES.has(context.schemaType)
				? input.filter(
						({ action }) =>
							action && ['publish', 'discardChanges', 'restore'].includes(action)
				  )
				: input,
	},
});
