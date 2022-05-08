import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Nav } from '../components/Nav'

function MyApp({ Component, pageProps }: AppProps) {
  const { logo, links } = pageProps
  
  return <>
    <Head>
      <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
    </Head>

    <Nav {...{logo, links}} />
    <Component {...pageProps} />
  </>
}

export default MyApp
