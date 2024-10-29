"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger
} from "@/components/ui/sheet"
import {
  Maximize,
  ClipboardList,
  Settings2Icon,
  Share2Icon
} from "lucide-react"
import { ReactNode, useEffect, useState } from "react"
import Menu from "@/components/presentation/Menu"

import MenuModalFooter from "./MenuModalFooter"
import { useCarouselContext } from "@/app/[...magazine]/context/carouselApiContext"
import { isDesktopScreenSize, isRunningStandalone } from "@/lib/utils"
import ShareModal from "../ShareModal"

type MenuModalProps = {
  children: ReactNode
}

export default function MenuModal({ children }: MenuModalProps) {
  const carouselApi = useCarouselContext((s) => s.carouselApi)
  const [shareShouldBeVisible, setShareShouldBeVisible] = useState(false)

  useEffect(() => {
    const isPWA = isRunningStandalone()
    setShareShouldBeVisible(
      !((isPWA && window.innerWidth > 400) || !isPWA || window.innerWidth < 350)
    )
  }, [])

  const handleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <Sheet modal={!isDesktopScreenSize()}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="flex w-80 flex-col justify-between">
        <nav className="space-y-10 overflow-y-auto py-4">
          <Menu.Section>
            <Menu.Title className="uppercase">
              <Settings2Icon className="size-4" />
              <h2>Geral</h2>
            </Menu.Title>
            <Menu.List>
              <SheetClose asChild>
                <Menu.Item onClick={() => handleFullScreen()}>
                  <Maximize className="mr-2 size-4" />
                  Tela Cheia
                </Menu.Item>
              </SheetClose>
              {shareShouldBeVisible && (
                <ShareModal>
                  <Menu.Item>
                    <Share2Icon className="mr-2 size-4" />
                    Compartilhar
                  </Menu.Item>
                </ShareModal>
              )}
            </Menu.List>
          </Menu.Section>
          <Menu.Section>
            <Menu.Title className="uppercase">
              <ClipboardList className="size-4" />
              <h2>Índice</h2>
            </Menu.Title>
            <Menu.List>
              <SheetClose asChild>
                <Menu.Item onClick={() => carouselApi?.slideTo(0)}>
                  Capa
                </Menu.Item>
              </SheetClose>
            </Menu.List>
          </Menu.Section>
        </nav>
        <SheetFooter>
          <MenuModalFooter />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
