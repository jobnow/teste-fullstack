import { Card } from '@/components'
import { NewPostForm } from './form'

export default async function NewPost() {
  return (
    <Card.Container>
      <h1 className='text-2xl mb-4'>Novo Post</h1>
      <NewPostForm />
    </Card.Container>
  )
}
