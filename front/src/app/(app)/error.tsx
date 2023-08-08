'use client'
import { Button } from '@/components'

export default function AppError() {
  return (
    <div className='grid place-items-center max-w-sm mx-auto py-12 gap-8'>
      <h2 className='text-4xl'>Algo deu errado!</h2>
      <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
    </div>
  )
}
