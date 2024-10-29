"use client"

import { useCatalog } from "@/app/[...magazine]/hooks/useCatalog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { searchPages } from "@/entities/catalog"
import { isDesktopScreenSize } from "@/lib/utils"
import { ReactNode, useEffect, useState } from "react"
import DesktopMatchingContent from "./components/DesktopMatchingContent"
import MobileMatchingContent from "./components/MobileMatchingContent"
import { useSearchModalContext } from "./context/searchModalContext"

type SearchModalProps = {
  children: ReactNode
}

export default function SearchModal({ children }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [matchingFiles, setMatchingFiles] = useState<number[]>([])
  const [isOpen, setIsOpen] = useSearchModalContext((s) => [
    s.isOpen,
    s.setIsOpen
  ])
  const catalog = useCatalog()

  useEffect(() => {
    async function main() {
      if (!catalog || searchTerm.length < 2) return
      const response = await searchPages(
        searchTerm,
        String(catalog.company_id || ""),
        String(catalog.id || "")
      )
      if (response) {
        setMatchingFiles(response)
      }
    }
    main()
  }, [searchTerm, catalog])

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
      modal={!isDesktopScreenSize()}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="max-h-full">
        <SheetHeader className="mb-6">
          <SheetTitle>Busca de Produtos</SheetTitle>
        </SheetHeader>
        <div className="h-full space-y-3">
          <Input
            type="text"
            placeholder="Digite o nome ou tipo do produto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="m-3 h-[90%]">
            <div
              className={`text-justify text-sm text-neutral-500 ${matchingFiles.length > 0 ? "hidden" : undefined}`}
            >
              Pesquise pelo nome ou o tipo do produto que está procurando e
              clique em uma das imagens exibidas nos resultados.
            </div>
            <ScrollArea className="h-full">
              {isDesktopScreenSize() ? (
                <DesktopMatchingContent matchingFiles={matchingFiles} />
              ) : (
                <MobileMatchingContent matchingFiles={matchingFiles} />
              )}
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
