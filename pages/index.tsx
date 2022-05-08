import type { GetStaticProps } from 'next'
import { Nav } from '../components/Nav'
import { InferGetStaticPropsType } from 'next';
import { query } from '.keystone/api';
import { Attachment } from '../lib/types';
import { PAGES_QUERY, PAGE_QUERY } from '../lib/utils';
import { Body } from '../components/Body';


const Home = ({logo, page, links}: InferGetStaticPropsType<typeof getStaticProps>) => {  
  const document = page?.content?.document || []
  return <>
    <Body {...{document}} />
  </>
}

export default Home


export const getStaticProps: GetStaticProps = async () => {
  const logo = await query.Attachment.findOne({ 
    where: {key: 'logo'},
    query: 'key title image { url height width } altText' 
  }) as Attachment[];
  const page = await query.Page.findOne({
    where: {slug: 'home'}, 
    query: PAGE_QUERY
  })
  const links = await query.Page.findMany({
    query: PAGES_QUERY
  })

  return {
    props: { logo, page, links }
  };
}
