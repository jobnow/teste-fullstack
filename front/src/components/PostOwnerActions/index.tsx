'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IconButton } from '@/components'
import { api } from '@/services'
import { Post, User } from '@/types'

type Props = {
  post: Post
  removePost: (id: number) => void
}

export function PostOwnerActions({ post, removePost }: Props) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const user = storagedUser ? JSON.parse(storagedUser) : null
    if (post.user.id !== user?.id) return
    setUser(user)
  }, [post])

  if (!user) return null

  async function handleDeletePost() {
    try {
      const token = localStorage.getItem('token')
      await api.delete(`posts/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      removePost(post.id)
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  function handleEditPost() {
    router.push(`/posts/edit/${post.id}`)
  }

  return (
    <div className='flex items-start gap-4 pl-4'>
      <IconButton icon='edit' onClick={handleEditPost} />
      <IconButton icon='trash' onClick={handleDeletePost} />
    </div>
  )
}
