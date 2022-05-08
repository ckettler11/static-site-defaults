import { config, list } from '@keystone-6/core';
import { file, image, relationship, select, text } from '@keystone-6/core/fields';
import { Lists } from '.keystone/types';
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from './components/blocks/componentBlocks';


const Page: Lists.Page = list({
  fields: {
    slug: text({isIndexed: 'unique', isFilterable: true}),
    title: text({validation: {isRequired: true}}),
    content: document({
      formatting: true,
      componentBlocks,
      ui: {
        views: require.resolve('./components/blocks/componentBlocks')
      },
    }),
    nav: select({
      options: [
        {value: 'left', label: 'Left'},
        {value: 'right', label: 'Right'},
        {value: 'more', label: 'More'},
        {value: 'none', label: 'None'},
      ]
    })
  }
})

const Attachment: Lists.Attachment = list({
  fields: {
    key: text({isIndexed: 'unique', isFilterable: true}),
    title: text({validation: { isRequired: true }}),
    altText: text({validation: { isRequired: true }}),
    image: image(),
  }
})

export default config({
  db: { provider: 'sqlite', url: 'file:./app.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: { Attachment, Page },
  images: {
    upload: 'local',
    local: {
      storagePath: 'public/images',
      baseUrl: '/images'
    }
  }
});