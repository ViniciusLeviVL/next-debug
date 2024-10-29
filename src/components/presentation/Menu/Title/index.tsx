import { cn } from "@/lib/utils"
import { AllHTMLAttributes, ReactNode } from "react"

type TitleProps = {
  children: ReactNode
} & AllHTMLAttributes<HTMLDivElement>

export default function Title({ children, className, ...rest }: TitleProps) {
  return (
    <div
      className={cn(
        "mx-5 my-5 flex h-4 flex-nowrap items-center gap-2 text-sm tracking-wider text-neutral-600",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
