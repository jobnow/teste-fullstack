'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components'
import { api } from '@/services'

export const LoginForm = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) router.replace('/feed')
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = formData.get('email')
    const password = formData.get('password')
    const data = {
      email,
      password,
    }

    try {
      const response = await api.post('/auth/login', data)
      const token = response.data.access_token
      localStorage.setItem('token', token)

      const profile = await api.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      localStorage.setItem('user', JSON.stringify(profile.data))
      router.push('/feed')
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <Input name='email' placeholder='E-mail' />
      <Input name='password' placeholder='Senha' type='password' />

      <Button>Entrar</Button>
    </form>
  )
}
