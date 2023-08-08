'use client'
import { useState } from 'react'
import { Card } from '@/components'
import { CommentActions } from './CommentActions'
import { Comment, Post } from '@/types'
import { EditCommentForm } from './EditCommentForm'

type Props = {
  post: Post
  comment: Comment
  removeComment: (id: number) => void
}

export function CommentCard({ post, comment, removeComment }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [commentDescription, setCommentDescription] = useState(
    comment.description,
  )

  function editComment() {
    setIsEditing(true)
  }

  function handleCancel() {
    setIsEditing(false)
  }

  function updateComment(description: string) {
    setIsEditing(false)
    setCommentDescription(description)
  }

  return (
    <Card.Container size='sm'>
      <div className='flex justify-between'>
        <Card.User id={comment.user.id}>{comment.user.name}</Card.User>
        <CommentActions
          post={post}
          comment={comment}
          removeComment={removeComment}
          editComment={editComment}
        />
      </div>
      {isEditing ? (
        <EditCommentForm
          comment={comment}
          commentDescription={commentDescription}
          updateComment={updateComment}
          handleCancel={handleCancel}
        />
      ) : (
        <Card.Description>{commentDescription}</Card.Description>
      )}
    </Card.Container>
  )
}
