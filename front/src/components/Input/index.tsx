export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => {
  return (
    <input
      required
      {...props}
      className={`w-72 rounded-md py-2 px-4 border border-zinc-300 bg-zinc-100 dark:border-slate-700 dark:bg-slate-950 ${props.className}`}
    />
  )
}
