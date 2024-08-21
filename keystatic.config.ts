// @ts-nocheck
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/post/*', // Adjusted path pattern
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        content: fields.markdoc({ label: 'Content' }),
        
        publishDate: fields.datetime({ label: 'Publish Date' }),
        updatedDate: fields.datetime({ label: 'Updated Date' }),
        // coverImage: fields.object({
        //   name: { label: 'Cover Image' },
        //   fields: {
        //     src: fields.text({ name: { label: 'Image Source' } }),
        //     alt: fields.text({ name: { label: 'Image Alt Text' } }),
        //   },
        // }),
        // tags: fields.object({ 
        //   name: { label: 'Tags' },
        //   of: fields.markdoc({ name: { label: 'Tag' } }),
        // }),
      },
    }),
  },
});
