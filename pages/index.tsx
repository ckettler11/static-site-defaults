import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return <>
    <Head>
      <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
    </Head>
  </>
}

export default Home
