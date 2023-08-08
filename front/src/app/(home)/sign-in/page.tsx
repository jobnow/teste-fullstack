import Link from 'next/link'
import { SignInForm } from './form'

export default function Login() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-2xl font-semibold'>Cadastre-se</h1>

      <SignInForm />

      <p className='text-xs w-64'>
        Já possui uma conta?{' '}
        <Link href='/login' className='text-sky-700 dark:text-sky-500'>
          Entre aqui
        </Link>
        .
      </p>
    </div>
  )
}
