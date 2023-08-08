import Link from 'next/link'

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: React.ReactNode
  variant?: 'fill' | 'ghost'
  href?: string
}

export const Button = ({
  href,
  children,
  variant = 'fill',
  ...props
}: ButtonProps) => {
  const Component = ({ className }: { className: string }) => {
    return href ? (
      <Link href={href} className={className}>
        {children}
      </Link>
    ) : (
      <button {...props} className={className}>
        {children}
      </button>
    )
  }

  return (
    <Component
      className={`w-full p-2 text-center rounded-lg transition-colors border ${
        variant === 'fill'
          ? `text-white border-sky-800 bg-sky-800 hover:bg-sky-900`
          : `border-transparent dark:text-sky-500 text-sky-800 hover:border-sky-900`
      } ${props.className}`}
    />
  )
}
