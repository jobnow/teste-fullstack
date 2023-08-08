'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Card, PostOwnerActions, PostUserActions } from '@/components'
import { Post } from '@/types'

type Props = {
  posts: Post[]
}

export function Posts({ posts }: Props) {
  const [postList, setPostList] = useState(posts)

  function removePost(id: number) {
    setPostList((state) => state.filter((post) => post.id !== id))
  }

  return (
    <>
      <h2>Posts</h2>
      {postList.map((post) => (
        <Card.Container key={post.id}>
          <div className='flex justify-between'>
            <Link
              href={`/posts/${post.id}`}
              className='flex-1 grid grid-cols-2 gap-4'
            >
              <div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Description>{post.description}</Card.Description>
              </div>
              <Card.Image src={post.imageUrl} />
            </Link>

            <PostOwnerActions post={post} removePost={removePost} />
          </div>
          <PostUserActions post={post} comments={post.comments} />
        </Card.Container>
      ))}
    </>
  )
}
