"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { ReactNode, useState } from "react"
import CartContent from "./components/CartContent"
import { isDesktopScreenSize } from "@/lib/utils"

type CartModalProps = {
  children: ReactNode
}

export default function CartModal({ children }: CartModalProps) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={!isDesktopScreenSize()}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[25rem] flex-col justify-between"
      >
        <SheetHeader>
          <SheetTitle>Minha Sacola</SheetTitle>
        </SheetHeader>
        <CartContent isOpen={open} />
      </SheetContent>
    </Sheet>
  )
}
