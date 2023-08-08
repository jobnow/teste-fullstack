'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Card, AddPostButton, PostUserActions } from '@/components'
import { api } from '@/services'
import { Post } from '@/types'

export default function Feed() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<Post[] | null>(null)

  async function getData() {
    const { data } = await api.get('/posts')
    setPosts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) return null
  if (!posts) throw new Error()

  return (
    <>
      {posts.length ? (
        posts.map((post) => (
          <Card.Container key={post.id}>
            <Card.User id={post.user.id}>{post.user.name}</Card.User>
            <Link href={`/posts/${post.id}`} className='grid grid-cols-2 gap-4'>
              <div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Description>{post.description}</Card.Description>
              </div>
              <Card.Image src={post.imageUrl} />
            </Link>
            <PostUserActions post={post} comments={post.comments} />
          </Card.Container>
        ))
      ) : (
        <strong className='text-center'>
          Não há posts publicados no momento.
        </strong>
      )}

      <AddPostButton />
    </>
  )
}
