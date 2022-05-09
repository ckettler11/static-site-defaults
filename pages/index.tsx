import type { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next';
import { query } from '.keystone/api';
import { Attachment } from '../lib/types';
import { ATTACHMENT_QUERY, PAGES_QUERY, PAGE_QUERY } from '../lib/utils';
import { Body } from '../components/Body';
import Head from 'next/head';


const Home = ({logo, page, links}: InferGetStaticPropsType<typeof getStaticProps>) => {  
  const document = page?.content?.document || []
  return <>
    <Head><title>{page.title}</title></Head>
    <Body {...{document}} />

    <pre>
      {JSON.stringify({page, links}, null, 2)}
    </pre>
  </>
}

export default Home


export const getStaticProps: GetStaticProps = async () => {
  const logo = await query.Attachment.findOne({ 
    where: {key: 'logo'},
    query: ATTACHMENT_QUERY
  }) as Attachment[];
  const p = await query.Page.findOne({
    where: {slug: 'home'}, 
    query: PAGE_QUERY
  })
  const page = JSON.parse(JSON.stringify(p))
  const links = await query.Page.findMany({
    query: PAGES_QUERY
  })

  return {
    props: { logo, page, links }
  };
}
