import { cn } from "@/lib/utils"
import { AllHTMLAttributes, ReactNode } from "react"

type SectionProps = {
  children: ReactNode
} & AllHTMLAttributes<HTMLElement>

export default function Section({
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section className={cn("w-full", className)} {...rest}>
      {children}
    </section>
  )
}
