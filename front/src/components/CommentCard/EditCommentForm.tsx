'use client'
import { Button, Input } from '@/components'
import { api } from '@/services'
import { Comment } from '@/types'

type Props = {
  comment: Comment
  commentDescription: string
  updateComment: (description: string) => void
  handleCancel: () => void
}

export const EditCommentForm = ({
  comment,
  commentDescription,
  updateComment,
  handleCancel,
}: Props) => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const description = formData.get('description')
    const data = { description }

    try {
      const token = localStorage.getItem('token')
      await api.patch(`/comments/${comment.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      updateComment(description as string)
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-3'>
      <Input
        className='w-full'
        name='description'
        placeholder='Comentário'
        defaultValue={commentDescription}
      />

      <div className='flex gap-2 self-end'>
        <Button variant='ghost' type='button' onClick={handleCancel}>
          Cancelar
        </Button>
        <Button>Publicar</Button>
      </div>
    </form>
  )
}
