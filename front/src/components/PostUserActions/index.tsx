'use client'
import { useEffect, useState } from 'react'
import { IconButton } from '@/components'
import { api } from '@/services'
import { Comment, Post, User } from '@/types'
import { CommentForm } from './CommentForm'

type Props = {
  post: Post
  comments: Comment[]
  updateComments?: (comments: Comment[]) => void
}

export function PostUserActions({ post, comments, updateComments }: Props) {
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [postData, setPostData] = useState(post)

  const commentCount = postData.comments?.length || 0
  const hasLiked = postData.likedByUsers?.some((u) => u.id === user?.id)
  const hasDisliked = postData.dislikedByUsers?.some((u) => u.id === user?.id)

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const user = storagedUser ? JSON.parse(storagedUser) : null
    setUser(user)
  }, [])

  async function call(action: 'like' | 'dislike') {
    try {
      const token = localStorage.getItem('token')
      let path = `/posts/${postData.id}/${action}`
      if (
        (hasLiked && action === 'like') ||
        (hasDisliked && action === 'dislike')
      ) {
        path = path + '/remove'
      }

      const { data } = await api.patch(path, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPostData(data)
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  function addComment(comment: Comment) {
    if (!user) return
    const commentList = [...comments, { ...comment, user }]
    updateComments?.(commentList)
    setPostData((state) => ({
      ...state,
      comments: commentList,
    }))
  }

  return (
    <div>
      <div className='mt-3 flex flex-wrap gap-1 justify-between text-neutral-600 dark:text-neutral-300'>
        <div className='flex gap-4'>
          <IconButton
            icon='thumbsUp'
            filled={hasLiked}
            disabled={!user}
            onClick={() => call('like')}
          >
            {postData.likes}
          </IconButton>
          <IconButton
            icon='thumbsDown'
            filled={hasDisliked}
            disabled={!user}
            onClick={() => call('dislike')}
          >
            {postData.dislikes}
          </IconButton>
          <IconButton
            icon='chat'
            disabled={!user}
            onClick={() => setIsCommentFormOpen(true)}
          >
            Comentar
          </IconButton>
        </div>

        <span>
          {post.views} {commentCount === 1 ? 'visualização' : 'visualizações'}
        </span>
        <span>
          {commentCount} {commentCount === 1 ? 'comentário' : 'comentários'}
        </span>
      </div>

      {isCommentFormOpen && (
        <CommentForm
          onClose={() => setIsCommentFormOpen(false)}
          addComment={addComment}
          postId={post.id}
        />
      )}
    </div>
  )
}
