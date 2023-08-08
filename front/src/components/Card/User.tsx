import Link from 'next/link'

type Props = {
  id: number
  children: string
}

export const CardUser = ({ id, children }: Props) => {
  return (
    <Link
      href={`/users/${id}`}
      className='inline-block mb-1 text-sm hover:underline text-neutral-600 dark:text-neutral-100'
    >
      {children}
    </Link>
  )
}
