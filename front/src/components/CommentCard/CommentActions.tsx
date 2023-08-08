'use client'
import { useEffect, useState } from 'react'
import { IconButton } from '@/components'
import { api } from '@/services'
import { Comment, Post, User } from '@/types'

type Props = {
  post: Post
  comment: Comment
  removeComment: (id: number) => void
  editComment: () => void
}

export function CommentActions({
  post,
  comment,
  removeComment,
  editComment,
}: Props) {
  const [userRole, setUserRole] = useState<
    'comment_owner' | 'post_owner' | null
  >(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const user = storagedUser ? JSON.parse(storagedUser) : null

    if (comment.user.id === user?.id) {
      setUserRole('comment_owner')
      setUser(user)
    } else if (post.user.id === user?.id) {
      setUserRole('post_owner')
      setUser(user)
    }
  }, [post, comment])

  if (!user) return null

  async function handleDeletePost() {
    try {
      const token = localStorage.getItem('token')
      await api.delete(`comments/${comment.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      removeComment(comment.id)
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  return (
    <div className='flex items-start gap-3 pl-4'>
      {userRole === 'comment_owner' && (
        <IconButton icon='edit' onClick={editComment} />
      )}
      <IconButton icon='trash' onClick={handleDeletePost} />
    </div>
  )
}
