import { Header } from '@/components'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='max-w-screen-md grid gap-2 p-14 pt-0 mx-auto text-left w-full'>
        {children}
      </div>
    </>
  )
}
