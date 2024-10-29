"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { LiHTMLAttributes, MouseEventHandler, ReactNode } from "react"

type ItemProps = {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
} & LiHTMLAttributes<HTMLLIElement>

export default function Item({ children, onClick, ...rest }: ItemProps) {
  return (
    <li {...rest}>
      <Button
        className="flex h-12 w-full outline-neutral-900 !ring-0"
        onClick={onClick}
        variant={"outline"}
      >
        {children}
        <ChevronRight className="ml-auto text-neutral-500" />
      </Button>
    </li>
  )
}
