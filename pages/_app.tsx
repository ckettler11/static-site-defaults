import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Nav } from '../components/Nav'
import { SiteContextProvider } from '../lib/context'

function MyApp({ Component, pageProps }: AppProps) {
  const { logo, links } = pageProps
  
  return <>
    <SiteContextProvider>
      <Nav {...{logo, links}} />
      <Component {...pageProps} />
    </SiteContextProvider>
  </>
}

export default MyApp
