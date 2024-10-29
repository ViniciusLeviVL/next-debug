"use client"

import { isEmpty } from "@/lib/utils"
import EmptyCart from "./components/EmptyCart"
import { useCartStore } from "@/store/cartStore"
import { useState } from "react"
import ListCart from "./components/ListCart"
import SuccessCart from "./components/SuccessCart"
import ProcessingCart from "./components/ProcessingCart"
import ErrorCart from "./components/ErrorCart"

export type CartStates = "product-list" | "processing" | "success" | "error"

export default function CartContent({ isOpen }: { isOpen: boolean }) {
  const cartItems = useCartStore((s) => s.cartItems)
  const [cartState, setCartState] = useState<CartStates>("product-list")
  const [errorMessages, setErrorMessages] = useState<string[]>([])

  if (isEmpty(cartItems)) return <EmptyCart />

  const onError = (errorMessages: string[]) => {
    setCartState("error")
    setErrorMessages(errorMessages)
  }

  switch (cartState) {
    case "product-list":
      return <ListCart onSuccess={() => setCartState("processing")} />
    case "processing":
      return (
        <ProcessingCart
          onSuccess={() => setCartState("success")}
          onError={onError}
        />
      )
    case "success":
      return <SuccessCart isOpen={isOpen} />
    default:
      return (
        <ErrorCart
          messages={errorMessages}
          handleClick={() => setCartState("product-list")}
        />
      )
  }
}
