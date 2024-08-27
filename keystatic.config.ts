import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  cloud: {
    project: 'dog-poopers/dogpoopers',
  },
  ui: {
    brand: { name: 'Dog Poopers' },
    // navigation: {
    //   'Content': ['pages', 'posts'],
    //   'Settings': ['site', 'seo'],
    // },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      entryLayout: 'content',
      slugField: 'title',
      path: 'src/content/post/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', validation: { length: { min: 50, max: 160 } } }),
        
        content: fields.markdoc({ label: 'Content' }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        publishDate: fields.datetime({ label: 'Publish Date' }),
        updatedDate: fields.datetime({ label: 'Updated Date' }),
        coverImage: fields.object({
          src: fields.image({
            label: 'Image file',
            directory: 'public/images/posts',
            publicPath: '/images/posts',
          }),
          alt: fields.text({ 
            label: 'Alt Text',
            // validation: { isRequired: true },
           }),
        }),

        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        
        ogImage: fields.text({ label: 'OG Image' }),
      },
    }),
  },
});