import { image, select, text } from "@keystone-6/core/fields";
import { Lists } from '.keystone/types';
import { list } from "@keystone-6/core";
import { document } from "@keystone-6/fields-document";
import { componentBlocks } from "../components/blocks/componentBlocks";

export const Page: Lists.Page = list({
  fields: {
    slug: text({isIndexed: 'unique', isFilterable: true}),
    title: text({validation: {isRequired: true}}),
    content: document({
      formatting: true,
      componentBlocks,
      ui: {
        views: require.resolve('../components/blocks/componentBlocks')
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