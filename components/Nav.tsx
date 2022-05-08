import Image from "next/image"
import Link from "next/link"
import { Attachment, Pages } from "../lib/types"

const LOGO_HEIGHT = 96

export const Nav = ({logo, links}: {logo: Attachment, links: Pages}) => {

  return <nav className='sticky top-0 border-b px-8 bg-white/75 backdrop-blur-sm'>
    <div className='flex h-full items-center gap-4'>
      <div className='w-72 order-2'>
        <a className='flex items-center justify-center relative' >
          {logo ? (
            <Image
              src={logo.image.url}
              height={LOGO_HEIGHT}
              width={logo.image.width * (LOGO_HEIGHT / logo.image.height)}
              alt={logo.altText}
              title={logo.title}
            />
          ) : (
            <Image
              src='https://bulma.io/images/placeholders/720x240.png'
              height={LOGO_HEIGHT}
              width={LOGO_HEIGHT * 3}
              alt={'Site Logo'}
              title={'Site Logo'}
            />
          )}
        </a>
      </div>
      <ul className='nav-left order-1 grow flex justify-start items-center'>
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
      <ul className='nav-right order-3 grow flex justify-end'>
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