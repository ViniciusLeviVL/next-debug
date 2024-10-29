// Zustand
import { create } from "zustand"
// Types
import { type Carousel as CarouselApiType } from "@fancyapps/ui/"
import CarouselActions from "./types/CarouselActions"
import CarouselStates from "./types/CarouselStates"

export type CarouselApiContextType = {
  carouselApi: CarouselApiType | undefined
  setCarouselApi: (carouselApi: CarouselApiType | undefined) => void
}

export const useCarouselContext = create<
  CarouselActions & CarouselStates & CarouselApiContextType
>()((set) => ({
  carouselApi: undefined,
  currentPage: 0,
  setCarouselApi: (carouselApi) => {
    set(() => ({ carouselApi }))
  },
  setCurrentPage: (page) => {
    set(() => ({ currentPage: page }))
  }
}))
