"use client"

import { useCarouselContext } from "@/app/[...magazine]/context/carouselApiContext"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { isDesktopScreenSize } from "@/lib/utils"
import { Loader2Icon, Minus, Plus } from "lucide-react"
import { useState } from "react"

export default function PageCounter() {
  const [isOpen, setIsOpen] = useState(false)
  const [carouselApi, currentPage] = useCarouselContext((s) => [
    s.carouselApi,
    s.currentPage
  ])
  const [inputValue, setInputValue] = useState(0)

  if (!carouselApi)
    return (
      <div className="flex items-center text-neutral-600 dark:text-neutral-50">
        <Loader2Icon className="animate-spin text-neutral-600 dark:text-neutral-50" />
      </div>
    )

  if (carouselApi.slides.length <= 1) return

  const onOpen = (isOpen: boolean) => {
    if (isOpen)
      setInputValue(
        isDesktopScreenSize() ? (currentPage - 1) * 2 + 1 : currentPage
      )
    setIsOpen(isOpen)
  }

  const handleChange = (value: number) => {
    if (isNaN(value)) return
    if (value === 0) setInputValue(0)
    if (
      value.toString().length <= carouselApi.slides.length.toString().length &&
      value >= 1
    )
      setInputValue(value)
  }

  const handleGoTo = () => {
    carouselApi.slideTo(
      isDesktopScreenSize() ? (inputValue - 1) / 2 : inputValue - 1
    )
    setIsOpen(false)
  }

  return (
    <Sheet onOpenChange={onOpen} open={isOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center text-neutral-600 dark:text-neutral-50">
          {(() => {
            if (isDesktopScreenSize()) {
              const parsedPage = (currentPage - 1) * 2 + 1
              const total = carouselApi.slides.length
              if (parsedPage >= total) {
                return `Página ${parsedPage - 1}/${parsedPage} de ${total}`
              }
              return `Página ${parsedPage}/${parsedPage + 1} de ${total}`
            }
            return `Página ${currentPage} de ${carouselApi.pages.length}`
          })()}
        </button>
      </SheetTrigger>
      <SheetContent side="top" className="mx-auto max-w-sm rounded-b-[10px]">
        <SheetHeader>
          <SheetTitle className="text-center">Ir para a Página</SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-evenly">
          <Button
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-full"
            onClick={() => setInputValue((v) => v - 1)}
            disabled={inputValue <= 1}
          >
            <Minus className="size-4" />
            <span className="sr-only">Diminuir</span>
          </Button>
          <input
            type="tel"
            className="w-32 text-center text-7xl font-bold tracking-tighter outline-none"
            value={inputValue}
            onChange={(e) => handleChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGoTo()
            }}
            autoFocus
          />
          <Button
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-full"
            onClick={() => setInputValue((v) => v + 1)}
            disabled={inputValue >= carouselApi.slides.length}
          >
            <Plus className="size-4" />
            <span className="sr-only">Aumentar</span>
          </Button>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="mt-2 w-full" onClick={handleGoTo}>
              Ir
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
