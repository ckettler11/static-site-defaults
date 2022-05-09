import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const SiteContext = createContext({
  scheme: 'light',
  setScheme: (scheme: 'light' | 'dark') => {}
})

export const SiteContextProvider = (props: {children: ReactNode}) => {
  const { children } = props;
  const [scheme, setScheme] = useState<string>('light')
  useEffect(() => {
    // get scheme from localStorage - or from device preference
    const s = localStorage.getItem('scheme')
    if(s && ['light', 'dark'].includes(s)) {
      setScheme(s)
    } else {
      if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setScheme('dark')
      }
    }
  }, [])

  useEffect(() => {
    const { classList } = document.querySelector('html')
    if(scheme === 'dark') {
      classList.add('dark')
      // classList.add('bg-slate-800')
    } else {
      classList.remove('dark')
      // classList.remove('bg-slate-800')
    }
    localStorage.setItem('scheme', scheme)
  }, [scheme])

  return <SiteContext.Provider value={{
    scheme, setScheme
  }}>
    {children}
  </SiteContext.Provider>
}

export const useSiteContext = () => {
  const siteContext = useContext(SiteContext);

  if(siteContext) {
    return siteContext
  } else {
    throw new Error('Site Context is borked.')
  }
}