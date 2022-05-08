import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Nav } from '../components/Nav'
import { Attachment } from '../lib/types'

function MyApp({ Component, pageProps }: AppProps) {
  const { attachments, links } = pageProps
  const logo = attachments?.find((a: Attachment) => a.key === 'logo')
  
  return <>
    <Head>
      <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
    </Head>

    <Nav {...{logo, links}} />
    <Component {...pageProps} />
  </>
}

export default MyApp
