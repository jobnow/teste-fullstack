import { Button, Input } from '@/components'
import { api } from '@/services'
import { Comment } from '@/types'

type Props = {
  postId: number
  onClose: () => void
  addComment: (comment: Comment) => void
}

export function CommentForm({ onClose, postId, addComment }: Props) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const description = formData.get('description')
    const data = { description }

    try {
      const token = localStorage.getItem('token')
      const response = await api.post(`/comments/post/${postId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      addComment(response.data)
      onClose()
    } catch (error) {
      alert('Algo deu errado')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-4 grid gap-2'>
      <Input name='description' placeholder='Comentário' className='w-full' />

      <div className='flex gap-3 justify-end'>
        <Button
          className='!w-fit !px-4'
          variant='ghost'
          type='button'
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button className='!w-fit !px-4'>Enviar</Button>
      </div>
    </form>
  )
}
