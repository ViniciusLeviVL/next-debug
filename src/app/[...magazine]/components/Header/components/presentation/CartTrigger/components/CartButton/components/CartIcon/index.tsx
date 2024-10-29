"use client"

import { useCartStore } from "@/store/cartStore"
import { ShoppingBag } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

export default function CartIcon() {
  const [animate, setAnimate] = useState(false)
  const cartItems = useCartStore((s) => s.cartItems)

  const totalQuantity = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  useEffect(() => {
    if (cartItems.length) {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 700)
    }
  }, [cartItems])

  return (
    <div className={`relative ${animate && "animate-wiggle"}`}>
      <div
        className={
          "absolute -left-[0.425rem] -top-[0.425rem] flex size-[1.15rem] items-center justify-center rounded-full bg-[#875a85]"
        }
      >
        <div className="-ml-[0.115rem] text-[13px] leading-5 text-white">
          {totalQuantity}
        </div>
      </div>
      <ShoppingBag className="mr-2 h-5 w-5" />
    </div>
  )
}
