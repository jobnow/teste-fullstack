'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ImageType } from 'react-images-uploading'
import { Button, ImageUpload, Input } from '@/components'
import { api } from '@/services'

export const NewPostForm = () => {
  const router = useRouter()
  const [image, setImage] = useState<ImageType | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const title = formData.get('title')
    const description = formData.get('description')
    const data = {
      title,
      description,
    }

    try {
      const token = localStorage.getItem('token')
      const config = { headers: { Authorization: `Bearer ${token}` } }

      let imageUrl = null
      if (image?.file) {
        const form = new FormData()
        form.append('file', image.file)
        const response = await api.post('/files', form, config)
        imageUrl = response.data.url
      }
      const response = await api.post('/posts', { ...data, imageUrl }, config)

      router.push(`/posts/${response.data.id}`)
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <Input name='title' placeholder='Título' />
      <Input name='description' placeholder='Descrição' className='w-full' />

      <div>
        <label className='mb-1 block'>Imagem</label>
        <ImageUpload image={image} setImage={setImage} />
      </div>

      <div className='flex gap-2 self-end'>
        <Button variant='ghost' href='/feed'>
          Cancelar
        </Button>
        <Button>Publicar</Button>
      </div>
    </form>
  )
}
