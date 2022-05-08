import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { query } from '.keystone/api';
import { PAGES_QUERY, PAGE_QUERY } from "../lib/utils";
import { Attachment } from "../lib/types";
import { Body } from "../components/Body";


const Page: NextPage = (props: any) => {
  const { page } = props
  const document = page?.content?.document

  if(!page) return <>Error 404</>
  return <>
    <Body {...{document}} />
  </>
}

export default Page

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.pageSlug as string;
  const page = await query.Page.findOne({
    where: { slug },
    query: PAGE_QUERY
  })

  const logo = await query.Attachment.findOne({ 
    where: {key: 'logo'},
    query: 'key title image { url height width } altText' 
  }) as Attachment[];

  const links = await query.Page.findMany({
    query: PAGES_QUERY
  })

  // get page data
  return {props: {page, logo, links}}
}

export const getStaticPaths: GetStaticPaths = async () => {
  // get slugs
  const pages = await query.Page.findMany({
    query: `slug`
  })

  return {
    paths: pages?.map(p => ({params: { pageSlug: p.slug }})),
    fallback: true
  }
}