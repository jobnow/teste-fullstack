'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Card, AddPostButton, Input } from '@/components'
import { api } from '@/services'
import { User } from '@/types'

export default function EditProfile() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<User | null>(null)

  async function getProfile() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '')
      const { data } = await api.get(`/users/${user?.id}`)
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
  if (!data) throw new Error('')

  async function EditUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const name = formData.get('name')
    const email = formData.get('email')
    const data = {
      name,
      email,
    }

    try {
      const token = localStorage.getItem('token')
      await api.patch('/users/me', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      router.push(`/users/me`)
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  return (
    <>
      <Card.Container>
        <h1 className='text-3xl font-semibold mb-4'>Editar perfil</h1>

        <form onSubmit={EditUser}>
          <div className='flex gap-4'>
            <Input
              className='w-full'
              name='name'
              placeholder='Nome'
              defaultValue={data.name}
            />
            <Input
              className='w-full'
              name='email'
              placeholder='E-mail'
              defaultValue={data.email}
            />
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <Button className='!w-44' variant='ghost' href='/users/me'>
              Cancelar
            </Button>
            <Button className='!w-44'>Salvar</Button>
          </div>
        </form>
      </Card.Container>

      <AddPostButton />
    </>
  )
}
