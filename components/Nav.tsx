import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useSiteContext } from "../lib/context"
import { Attachment, Pages } from "../lib/types"
import { imageLoader } from "../lib/utils"

const LOGO_SMALL = 24
const LOGO_LARGE = 32

export const Nav = ({logo, links}: {logo: Attachment, links: Pages}) => {
  const [logoHeight, setLogoHeight] = useState(60)
  const ref = useRef<HTMLDivElement>(null)
  const [isAtTop, setAtTop] = useState(true)
  useEffect(() => {
    const resize = () => setLogoHeight(window.innerWidth > 768 ? LOGO_LARGE : LOGO_SMALL)
    const checkTop = () => {
      const top = ref?.current?.getBoundingClientRect()?.top
      console.log(ref?.current?.getBoundingClientRect())
      if(top < 0) {
        setAtTop(false)
      } else {
        setAtTop(true)
      }
    }
    resize()
    window.addEventListener('resize', resize, true)
    window.addEventListener('scroll', checkTop, true)
    return () => {
      window.removeEventListener('scroll', checkTop)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const { scheme } = useSiteContext()
  const image = scheme === 'dark' && !!logo.darkImage
  ? logo.darkImage
  : logo.image

  return <>
    <div ref={ref} />
    <nav id='site-nav' className={'sticky top-0 px-8 h-12 md:h-14 transition-all backdrop-blur-sm ' + (!isAtTop && ' bg-white/75 dark:bg-slate-800/75 ')}>
      <div className='flex h-full items-center gap-4 justify-center'>
        <div className='w-72 order-2'>
          <Link href={'/'}>
            <a className='flex items-center justify-center relative py-3' >
              {logo ? (
                <Image
                  loader={imageLoader}
                  src={image.url}
                  alt={logo.altText}
                  title={logo.title}
                  height={logoHeight}
                  width={image.width * (logoHeight / image.height)}
                />
              ) : (
                <>Logo</>
                // <Image
                //   src='https://bulma.io/images/placeholders/720x240.png'
                //   height={logoHeight}
                //   width={logoHeight * 3}
                //   alt={'Site Logo'}
                //   title={'Site Logo'}
                // />
              )}
            </a>
          </Link>
        </div>

        <ul className='nav-left order-1 grow w-24 hidden md:flex justify-start items-center gap-2'>
        {links
        ?.filter(link => link.nav === 'left')
        ?.map(link => (
          <li key={`${link.slug}`}>
            <Link href={`/${link.slug}`}>
              <a>{link.title}</a>
            </Link>
          </li>
        ))}
        </ul>

        <ul className='nav-right order-3 grow w-24 hidden md:flex justify-end items-center gap-2'>
          {links
          ?.filter(link => link.nav === 'right')
          ?.map(link => (
            <li key={`${link.slug}`}>
              <Link href={`/${link.slug}`}>
                <a>{link.title}</a>
              </Link>
            </li>
          ))}
          <li className='flex items-center'>
            <Schemer />
          </li>
        </ul>
      </div>
    </nav>
  </>
}

const Schemer = () => {
  const { scheme, setScheme } = useSiteContext()
  return <button onClick={() => setScheme(scheme === 'light' ? 'dark' : 'light')} className='h-10 w-10 border border-solid border-slate-200 dark:border-slate-500 rounded-full flex items-center justify-center bg-slate-50/50 dark:bg-slate-800/50'>
    <span className='w-full text-center text-xl'>{scheme === 'light' ? '🌝' : '🌞'}</span>
  </button>
}