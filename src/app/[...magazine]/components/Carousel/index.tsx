"use client"

import { Carousel as FancyCarousel, Panzoom } from "@fancyapps/ui/"
import "@fancyapps/ui/dist/carousel/carousel.css"
import "@fancyapps/ui/dist/panzoom/panzoom.css"
import "./carousel.css"
import { useCarouselContext } from "@/app/[...magazine]/context/carouselApiContext"
import { ReactNode, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { cn, isDesktopScreenSize } from "@/lib/utils"

type CarouselProps = {
  children?: ReactNode[]
}

export default function Carousel({ children }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [setCarouselApi, setCurrentPage] = useCarouselContext((s) => [
    s.setCarouselApi,
    s.setCurrentPage
  ])
  const initialPage = parseInt(useSearchParams().get("page") || "1") - 1

  useEffect(() => {
    if (!carouselRef.current) return
    const carouselInstance = new FancyCarousel(carouselRef.current, {
      infinite: false,
      transition: "crossfade",
      Dots: false,
      initialPage: isDesktopScreenSize() ? initialPage / 2 : initialPage,
      preload: 3,
      on: {
        ready: (carousel: FancyCarousel) => {
          setCarouselApi(carousel)
          setCurrentPage(carousel.page + 1)
          setLoading(false)
        },
        initSlide: (_carousel: FancyCarousel, slide) => {
          slide.panzoom = new Panzoom(slide.el.querySelector(".f-panzoom"), {
            panOnlyZoomed: true,
            dblClick: "toggleMax",
            maxScale: 3,
            on: {
              // Hide prev and next buttons when Panzoom instance is zoomed
              endAnimation: ({ scale, container }: Panzoom) => {
                const buttonElements = document
                  .querySelector(".f-carousel__nav")
                  ?.querySelectorAll<HTMLElement>(".f-button")
                if (scale > 1) {
                  container.style.zIndex = "999"
                  buttonElements?.forEach((button) => {
                    button.style.display = "none"
                  })
                } else {
                  container.style.zIndex = "initial"
                  buttonElements?.forEach((button) => {
                    button.style.display = "flex"
                  })
                }
              }
            }
          })
        },
        change: (carousel: FancyCarousel, to, from) => {
          setCurrentPage(carousel.page + 1)
          // Apply animation for pins in view
          carousel.pages[to].slides.forEach((slide) => {
            slide?.el
              ?.querySelectorAll<HTMLElement>("[data-pin]")
              .forEach((pin) => {
                const animation = pin.dataset.animation
                pin.dataset.animation = ""
                window.requestAnimationFrame(() => {
                  pin.dataset.animation = animation
                })
              })
          })
          // Reset the Panzoom instance to its original scale and position
          carousel.slides[from]?.panzoom?.reset(0.15)
        }
      },
      breakpoints: {
        "((min-width: 1024px) and (min-height: 768px))": { slidesPerPage: 2 }
      }
    })

    return () => {
      carouselInstance.destroy()
    }
  }, [setCarouselApi, carouselRef, initialPage, setCurrentPage])

  return (
    <div
      className="f-carousel relative size-full max-w-[552px] cursor-grab active:cursor-grabbing md:w-11/12 md:max-w-5xl"
      ref={carouselRef}
    >
      <div
        className={cn(
          "f-carousel__viewport !overflow-visible lg:!overflow-hidden",
          loading && "hidden"
        )}
      >
        {children?.map((children, index) => {
          return (
            <div
              key={index}
              className="f-carousel__slide flex items-center justify-center"
            >
              {children}
            </div>
          )
        })}
      </div>
    </div>
  )
}
