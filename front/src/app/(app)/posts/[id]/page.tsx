'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Card,
  CommentCard,
  PostOwnerActions,
  PostUserActions,
} from '@/components'
import { api } from '@/services'
import { Comment, Post } from '@/types'

type PageProps = {
  params: { id: string }
}

export default function Post({ params: { id } }: PageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  function removeComment(id: number) {
    setComments((state) => state.filter((post) => post.id !== id))
  }

  async function getData() {
    const token = localStorage.getItem('token')
    let config = {}
    if (token) config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await api.get(`/posts/${id}`, config)
    setPost(response.data)
    const { data } = await api.get(`/comments/post/${id}`)
    setComments(data)
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
        <div className='flex justify-between'>
          <Card.User id={post.user.id}>{post.user.name}</Card.User>
          <PostOwnerActions
            post={post}
            removePost={() => router.push('/feed')}
          />
        </div>
        <Card.Title>{post.title}</Card.Title>
        <Card.Description>{post.description}</Card.Description>
        <div className='mt-2'>
          <Card.Image src={post.imageUrl} />
        </div>
        <PostUserActions
          post={post}
          comments={comments}
          updateComments={setComments}
        />
      </Card.Container>

      {!comments.length ? (
        <h2>Não há comentários</h2>
      ) : (
        <>
          <h2>Comentários</h2>
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              post={post}
              comment={comment}
              removeComment={removeComment}
            />
          ))}
        </>
      )}
    </>
  )
}
