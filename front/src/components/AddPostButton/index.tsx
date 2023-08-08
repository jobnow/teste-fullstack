'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icon } from '@/components'

export const AddPostButton = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const user = storagedUser ? JSON.parse(storagedUser) : null
    setUser(user)
  }, [])

  if (!user) return null

  return (
    <Link
      href='/posts/new'
      className='fixed bottom-10 right-10 lg:bottom-14 lg:right-32 p-3 text-3xl rounded-full text-white bg-sky-600 dark:bg-sky-900 shadow-sm hover:scale-105 transition-transform'
    >
      <Icon name='plus' />
    </Link>
  )
}
