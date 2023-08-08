type Props = {
  children: string
}

export const CardTitle = ({ children }: Props) => {
  return (
    <strong className='block mb-2 text-2xl font-semibold'>{children}</strong>
  )
}
