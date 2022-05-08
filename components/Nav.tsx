import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Attachment, Pages } from "../lib/types"

const LOGO_SMALL = 32
const LOGO_LARGE = 40

export const Nav = ({logo, links}: {logo: Attachment, links: Pages}) => {
  const [logoHeight, setLogoHeight] = useState(60)
  useEffect(() => {
    const resize = () => setLogoHeight(window.innerWidth > 768 ? LOGO_LARGE : LOGO_SMALL)
    resize()
    window.addEventListener('resize', resize, true)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return <nav className='sticky top-0 px-8 h-12 md:h-14 bg-white/75 backdrop-blur-sm'>
    <div className='flex h-full items-center gap-4 justify-center'>
      <div className='w-72 order-2'>
        <Link href={'/'}>
          <a className='flex items-center justify-center relative py-2' >
            {logo ? (
              <Image
                src={logo.image.url}
                alt={logo.altText}
                title={logo.title}
                height={logoHeight}
                width={logo.image.width * (logoHeight / logo.image.height)}
              />
            ) : (
              <Image
                src='https://bulma.io/images/placeholders/720x240.png'
                height={logoHeight}
                width={logoHeight * 3}
                alt={'Site Logo'}
                title={'Site Logo'}
              />
            )}
          </a>
        </Link>
      </div>

      <ul className='nav-left order-1 grow w-24 hidden md:flex justify-start items-center'>
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

      <ul className='nav-right order-3 grow w-24 hidden md:flex justify-end'>
        {links
        ?.filter(link => link.nav === 'right')
        ?.map(link => (
          <li key={`${link.slug}`}>
            <Link href={`/${link.slug}`}>
              <a>{link.title}</a>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  </nav>
}