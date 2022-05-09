import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { query } from '.keystone/api';
import { ATTACHMENT_QUERY, PAGES_QUERY, PAGE_QUERY } from "../lib/utils";
import { Attachment } from "../lib/types";
import { Body } from "../components/Body";
import Error from "next/error";
import Head from "next/head";


const Page: NextPage = (props: any) => {
  const { page } = props
  const document = page?.content?.document

  if(!page) return <>Error 404</>
  return <>
    <Head>
      <title>{page.title}</title>
    </Head>

    <Body {...{document}} />

    <pre>
      {JSON.stringify({page}, null, 2)}
    </pre>
  </>
}

export default Page

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.pageSlug as string;
  const p = await query.Page.findOne({
    where: { slug },
    query: PAGE_QUERY
  }) || ''
  const page = JSON.parse(JSON.stringify(p))

  const logo = await query.Attachment.findOne({ 
    where: {key: 'logo'},
    query: ATTACHMENT_QUERY
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
    fallback: false
  }
}