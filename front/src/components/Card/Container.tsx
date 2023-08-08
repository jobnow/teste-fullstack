type Props = {
  children: React.ReactNode
  size?: 'sm' | 'md'
}

export const CardContainer = ({ children, size = 'md' }: Props) => {
  return (
    <div
      className={`h-fit group rounded-lg border border-transparent ${
        size === 'sm' ? 'p-3' : 'px-5 py-4'
      } border-gray-400 bg-gray-200 dark:border-neutral-700 dark:bg-neutral-800/30`}
    >
      {children}
    </div>
  )
}
