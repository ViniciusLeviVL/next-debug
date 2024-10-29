"use client"

import { toBRL } from "@/lib/utils"
import CartIcon from "./components/CartIcon"
import { useMemo } from "react"
import { useCartStore } from "@/store/cartStore"

export default function CartButton() {
  const cartItems = useCartStore((s) => s.cartItems)

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  )

  return (
    <div className="flex cursor-pointer items-center text-neutral-600 hover:text-neutral-900 dark:text-neutral-50 dark:hover:text-neutral-50/90">
      <CartIcon />
      {toBRL(totalPrice)}
    </div>
  )
}
