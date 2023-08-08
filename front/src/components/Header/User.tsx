'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/services'
import { User } from '@/types'

export function User() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<User | null>(null)

  async function getProfile() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const { data } = await api.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      localStorage.setItem('user', JSON.stringify(data))
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  if (isLoading) return null

  function logout() {
    localStorage.clear()
    router.push('/')
  }

  return (
    <div className='flex gap-4'>
      {data ? (
        <>
          <Link href='/users/me' className='hover:underline'>
            Perfil ({data.name})
          </Link>
          <button onClick={logout} className='hover:underline'>
            Sair
          </button>
        </>
      ) : (
        <Link href='/login' className='hover:underline'>
          Entrar
        </Link>
      )}
    </div>
  )
}
