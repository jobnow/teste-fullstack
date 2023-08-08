'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ImageType } from 'react-images-uploading'
import { Button, ImageUpload, Input } from '@/components'
import { api } from '@/services'
import { Post } from '@/types'

type Props = {
  post: Post
}

export const EditPostForm = ({ post }: Props) => {
  const router = useRouter()
  const [defaultImage, setDefaultImage] = useState(post.imageUrl)
  const [image, setImage] = useState<ImageType | null>(null)

  function removeDefaultImage() {
    setDefaultImage('')
  }

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

      let imageUrl = defaultImage || null
      if (image?.file) {
        const form = new FormData()
        form.append('file', image.file)
        const response = await api.post('/files', form, config)
        imageUrl = response.data.url
        console.log(imageUrl)
      }
      await api.patch(`/posts/${post.id}`, { ...data, imageUrl }, config)

      router.push(`/posts/${post.id}`)
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <Input name='title' placeholder='Título' defaultValue={post.title} />
      <Input
        name='description'
        placeholder='Descrição'
        className='w-full'
        defaultValue={post.description}
      />

      <div>
        <label className='mb-1 block'>Imagem</label>
        <ImageUpload
          image={image}
          setImage={setImage}
          defaultImage={defaultImage}
          removeDefaultImage={removeDefaultImage}
        />
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
