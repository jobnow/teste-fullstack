'use client'
import { useState, useEffect } from 'react'
import { AddPostButton } from '@/components'
import { Post, User } from '@/types'
import { api } from '@/services'
import { Posts } from './Posts'

type PageProps = {
  params: { id: string }
}

export default function User({ params: { id } }: PageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  async function getData() {
    const response = await api.get(`/users/${id}`)
    setUser(response.data)
    const { data } = await api.get(`/posts/user/${id}`)
    setPosts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) return null
  if (!user) throw new Error()

  return (
    <>
      <h1 className='text-4xl font-semibold mb-4'>{user.name}</h1>

      {!posts.length ? (
        <h2>Não há posts publicados</h2>
      ) : (
        <Posts posts={posts} />
      )}

      <AddPostButton />
    </>
  )
}
