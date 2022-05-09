export const PAGE_QUERY = `title content { document(hydrateRelationships: true) }`
export const PAGES_QUERY = `title slug nav`
export const ATTACHMENT_QUERY = `key title image { url height width } darkImage { url height width } altText`

export const imageLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_SITE_ADDRESS}${src}?w=${width}&q=${quality || 75}`
}