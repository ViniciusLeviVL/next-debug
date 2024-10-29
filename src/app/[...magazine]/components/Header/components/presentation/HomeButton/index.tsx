"use client"

import { useCarouselContext } from "@/app/[...magazine]/context/carouselApiContext"
import { HomeIcon } from "lucide-react"

export default function HomeButton() {
  const carouselApi = useCarouselContext((s) => s.carouselApi)
  return (
    <button
      className="hidden 2xs:block"
      onClick={() => carouselApi?.slideTo(0)}
    >
      <HomeIcon className="h-5 w-5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-50 dark:hover:text-neutral-50/90" />
    </button>
  )
}
