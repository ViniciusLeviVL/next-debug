import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip
} from "@radix-ui/react-tooltip"
import { HTMLAttributes, ReactNode } from "react"

type LinkButtonProps = {
  children: ReactNode
  HoverContent: ReactNode
} & HTMLAttributes<HTMLDivElement>

export default function LinkButton({
  children,
  HoverContent
}: LinkButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{HoverContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
