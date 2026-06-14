import type { SchemaTypeDefinition } from 'sanity';

// Objects (reusable)
import { seo } from './objects/seo';
import { blockContent } from './objects/blockContent';
import { link } from './objects/link';

// Documents
import { siteSettings } from './documents/siteSettings';
import { page } from './documents/page';
import { post } from './documents/post';
import { author } from './documents/author';
import { category } from './documents/category';
import { program } from './documents/program';

export const schemaTypes: SchemaTypeDefinition[] = [
	// objects
	seo,
	blockContent,
	link,
	// documents
	siteSettings,
	page,
	post,
	author,
	category,
	program,
];
