import ProductCard from "./components/ProductCard"
import { Button } from "@/components/ui/button"
import { toBRL } from "@/lib/utils"
import { useCartStore } from "@/store/cartStore"
import { useMemo } from "react"

type ListCartProps = {
  onSuccess: () => void
}

export default function ListCart({ onSuccess }: ListCartProps) {
  const cartItems = useCartStore((s) => s.cartItems)
  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  )
  return (
    <>
      <div className="scroll-hidden h-full space-y-5 overflow-y-auto p-1">
        {cartItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <p className="mb-6 w-full space-x-10 text-end">
        <span className="font-medium uppercase">TOTAL</span>
        <span className="font-semibold text-green-600">
          {toBRL(totalPrice)}
        </span>
      </p>
      <Button
        size={"lg"}
        className="h-12 w-full bg-success hover:bg-green-600"
        onClick={onSuccess}
      >
        Finalizar Pedido
      </Button>
    </>
  )
}
