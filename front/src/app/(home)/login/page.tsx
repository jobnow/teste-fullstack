import Link from 'next/link'
import { LoginForm } from './form'

export default function Login() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-2xl font-semibold'>Entre na sua conta</h1>

      <LoginForm />

      <p className='text-xs w-64'>
        Ainda não tem uma conta?{' '}
        <Link href='/sign-in' className='text-sky-700 dark:text-sky-500'>
          Cadastre-se aqui
        </Link>
        .
      </p>
    </div>
  )
}
