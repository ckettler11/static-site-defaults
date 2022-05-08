import type { GetStaticProps } from 'next'
import { Nav } from '../components/Nav'
import { InferGetStaticPropsType } from 'next';
import { query } from '.keystone/api';
import { Attachment } from '../lib/types';
import { Hero } from '../components/Hero';
import { PAGES_QUERY, PAGE_QUERY } from '../lib/utils';


const Home = ({attachments, page, links}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const logo = attachments?.find((a: Attachment) => a.key === 'logo')
  
  return <>
    <Hero {...{}} />
    <pre>
      {JSON.stringify({page, links}, null, 2)}
    </pre>
  </>
}

export default Home


export const getStaticProps: GetStaticProps = async () => {
  const attachments = await query.Attachment.findMany({ query: 'key title image { url height width } altText' }) as Attachment[];
  const page = await query.Page.findOne({
    where: {slug: 'home'}, 
    query: PAGE_QUERY
  })
  const links = await query.Page.findMany({
    query: PAGES_QUERY
  })

  return {
    props: { attachments, page, links }
  };
}
