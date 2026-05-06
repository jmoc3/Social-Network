import type { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputClass?: string,
}

export const Input: FC<Props> = ({inputClass, ...props}: Props) => {
  return (
    <input className={`px-2 py-1 focus:outline-none focus:border-cyan-800 border-b transition-all  ${inputClass}`} {...props}></input>
  )
}