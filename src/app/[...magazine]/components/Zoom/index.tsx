import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type ZoomProps = {
  children: ReactNode
  className?: string
}

export default function Zoom({ children, className }: ZoomProps) {
  return (
    <div
      className={cn(
        "f-panzoom cursor-grab !overflow-visible md:w-full",
        className
      )}
    >
      <div className="f-panzoom__content">{children}</div>
    </div>
  )
}
