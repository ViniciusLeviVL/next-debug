import { useCarouselContext } from "@/app/[...magazine]/context/carouselApiContext"
import { isDesktopScreenSize } from "@/lib/utils"
import { useSearchModalContext } from "../context/searchModalContext"

export default function useGoToPage() {
  const carouselApi = useCarouselContext((s) => s.carouselApi)
  const closeModal = useSearchModalContext((s) => s.closeModal)

  const handlePageGo = (page: number) => {
    if (!carouselApi) return

    try {
      carouselApi?.slideTo(page)

      if (!isDesktopScreenSize()) {
        closeModal()
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("Error setting page number")
    }
  }

  return handlePageGo
}
