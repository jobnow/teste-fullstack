import { Icon, IconName } from '@/components'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: IconName
  filled?: boolean
}

export function IconButton({ children, icon, filled, ...props }: Props) {
  return (
    <button
      {...props}
      className={
        'flex items-center gap-1 hover:opacity-75 disabled:opacity-100 transition-opacity ' +
        props.className
      }
    >
      <Icon name={icon} weight={filled ? 'fill' : 'regular'} />
      {children}
    </button>
  )
}
