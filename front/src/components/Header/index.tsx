import Image from 'next/image'
import Link from 'next/link'
import { User } from './User'
import { ToggleThemeButton } from '..'

export const Header = () => {
  return (
    <header className='py-10 px-14 w-full sticky top-0 bg-gradient-to-b from-80% from-gray-300 dark:from-black to-transparent'>
      <div className='mx-auto w-full max-w-5xl items-center justify-between text-sm flex'>
        <div className="z-10 relative flex place-items-center before:absolute before:h-[150px] before:w-[240px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[120px] after:w-[120px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[180px]">
          <Link href='/feed'>
            <Image
              className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
              src='/next.svg'
              alt='Next.js Logo'
              width={147}
              height={30}
              priority
            />
          </Link>
        </div>

        <div className='flex gap-6'>
          <User />
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  )
}
