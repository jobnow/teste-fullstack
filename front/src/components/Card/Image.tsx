type Props = {
  src?: string
}

export const CardImage = ({ src }: Props) => {
  return src ? (
    <img
      src={src}
      className={`rounded-md border border-transparent border-gray-400 bg-gray-300 dark:border-neutral-700 dark:bg-neutral-900/30`}
    />
  ) : null
}
