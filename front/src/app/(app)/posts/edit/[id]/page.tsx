'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components'
import { api } from '@/services'
import { Post } from '@/types'
import { EditPostForm } from './form'

type PageProps = {
  params: { id: string }
}

export default function EditPost({ params: { id } }: PageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<Post | null>(null)

  async function getData() {
    const token = localStorage.getItem('token')
    let config = {}
    if (token) config = { headers: { Authorization: `Bearer ${token}` } }
    const { data } = await api.get(`/posts/${id}`, config)
    setPost(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) return null
  if (!post) throw new Error()

  return (
    <>
      <Card.Container>
        <h1 className='text-2xl mb-4'>Editar Post</h1>
        <EditPostForm post={post} />
      </Card.Container>
    </>
  )
}
