import { GetStaticProps } from "next";
import { PAGES_QUERY, PAGE_QUERY } from "../lib/utils";
import { query } from '.keystone/api';
import { Attachment } from "../lib/types";
import { Body } from "../components/Body";
import Error from "next/error";

export default function Custom404({page, logo, links}) {
  const document = page?.content?.document
  if(!document) return <>Error 404</>
  return <Body {...{document}} />
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = 'error'
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