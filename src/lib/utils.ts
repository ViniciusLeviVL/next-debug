import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import Product from "@/types/Product"
import Pin from "@/types/Pin"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toBRL = (value: number) =>
  value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })

export function phoneToBR(number: string) {
  if (number.startsWith("+55")) return number
  let v = number.replace(/\D/g, "")
  v = "+55" + v
  return v
}

export function isEven(n: number): boolean {
  return n % 2 === 0
}

export function isEmpty<T>(array?: T[]) {
  if (!array) {
    throw new Error(`Array cannot be ${typeof array}`)
  }
  return Array.isArray(array) && array.length === 0
}

export function parsePinToProduct(pin: Pin): Product {
  const array_codes = pin.codes.split("|")
  const array_colors = pin.colors.split("|")
  const array_sizes = pin.sizes.split("|")

  return {
    id: pin.id,
    description: pin.description,
    price: pin.price,
    reference: pin.reference,
    page: pin.image_number,
    codes: array_codes.length > 1 ? array_codes : undefined,
    colors: array_colors.length > 1 ? array_colors : undefined,
    sizes: array_sizes.length > 1 ? array_sizes : undefined,
    relatives: pin.relatives ? JSON.parse(pin.relatives) : undefined
  }
}

/**
 * The value of the minimum width to be a desktop screen
 */
export const desktopScreenWidth = 1024

// These functions below only works on Client Side Rendering (CSR)

/**
 * Returns true if the window inner width is greater than or equal to desktopScreenWidth
 *
 * This function only works on Client Side Rendering (CSR)
 */
export const isDesktopScreenSize = () =>
  typeof window !== "undefined" && window.innerWidth >= desktopScreenWidth

/**
 * Returns true if the website is running in display mode standalone
 *
 * This function only works on Client Side Rendering (CSR)
 */
export const isRunningStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches

/**
 * Copy the text for clipboard and fires a toast containing the results
 *
 * This function only works on Client Side Rendering (CSR)
 */
export const copy = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copiado!")
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao copiar!")
      })
  } else {
    toast.error("Ocorreu um erro ao copiar!")
  }
}
