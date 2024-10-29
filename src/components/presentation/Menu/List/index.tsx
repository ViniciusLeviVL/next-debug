import { cn } from "@/lib/utils"
import { AllHTMLAttributes, ReactNode } from "react"

type ListProps = {
  children: ReactNode
} & AllHTMLAttributes<HTMLElement>

export default function List({ children, className, ...rest }: ListProps) {
  return (
    <ul
      className={cn("flex w-full flex-col justify-between gap-3", className)}
      {...rest}
    >
      {children}
    </ul>
  )
}
