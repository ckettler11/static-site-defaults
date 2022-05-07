import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return <>
    <Head>
      <title>Home Page Title</title>
    </Head>

    <nav className='sticky top-0 py-4 px-8 border-b'>
      Navigation
    </nav>

    <main>
      <header className='p-8 border-b bg-slate-200'> {/* HERO */}
        Header
      </header>
      <div className='flex w-full'>
        <section className='grow p-8'>
          Main
        </section>
        <aside className='w-72 p-8 border-l'>
          Aside
        </aside>
      </div>
    </main>


    <footer className='border-t p-8'>
      Footer
    </footer>
  </>
}

export default Home
