import { image, text } from "@keystone-6/core/fields";
import { Lists } from '.keystone/types';
import { list } from "@keystone-6/core";

export const Attachment: Lists.Attachment = list({
  fields: {
    key: text({isIndexed: 'unique', isFilterable: true}),
    title: text({validation: { isRequired: true }}),
    altText: text({validation: { isRequired: true }}),
    image: image(),
    darkImage: image(),
  }
})