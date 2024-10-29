"use client"

import { XCircle } from "lucide-react"
import { toBRL } from "@/lib/utils"
import CartItem from "@/types/CartItem"
import { useCartStore } from "@/store/cartStore"
import QuantityInput from "@/components/presentation/QuantityInput"

type ItemCardProps = {
  product: CartItem
}

export default function ProductCard({ product }: ItemCardProps) {
  const [removeFromCart, updateQuantity] = useCartStore((s) => [
    s.removeFromCart,
    s.updateQuantity
  ])

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item)
  }
  const handleChangeQuantity = (item: CartItem, amount: 1 | -1) => {
    updateQuantity(item, amount)
  }
  return (
    <div className="relative flex justify-between rounded bg-white p-2 shadow-md">
      <button
        className="absolute -right-1 -top-1 rounded-full bg-[#faebe8] text-sm text-red-500 transition-colors hover:text-red-600"
        onClick={() => handleRemoveItem(product)}
      >
        <XCircle />
      </button>
      <div className="flex w-full flex-col justify-between">
        <h4>{product.description}</h4>
        <p className="flex items-center text-xs leading-5">
          {product.size && product.color
            ? `${product.size} | ${product.color}`
            : product.color || product.size}
        </p>
      </div>
      <div className="flex min-w-[6.5rem] flex-col items-center justify-between p-1">
        <h4 className="mb-2 font-medium">
          {toBRL(product.quantity * product.price)}
        </h4>
        <QuantityInput
          quantity={product.quantity}
          onClickMinus={() => handleChangeQuantity(product, -1)}
          onClickPlus={() => handleChangeQuantity(product, 1)}
        />
      </div>
    </div>
  )
}
