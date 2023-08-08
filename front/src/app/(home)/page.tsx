import { Button } from '@/components'

export default function Home() {
  return (
    <div className='max-w-xs'>
      <h1 className='text-3xl font-semibold text-left w-full mb-4'>
        Aquela frase de
        <br />
        efeito bem massa.
      </h1>
      <h2 className='text-xl text-left w-full mb-8'>Inscreva-se agora mesmo</h2>

      <div className='grid gap-2 w-full'>
        <Button href='/login'>Entrar</Button>
        <Button href='/sign-in' variant='ghost'>
          Criar uma conta
        </Button>
        <Button href='/feed' variant='ghost'>
          Entrar como convidado
        </Button>
      </div>
    </div>
  )
}
