"use client"

import { useCompany } from "@/app/[...magazine]/hooks/useCompany"
import Loader from "@/components/presentation/Loader"
import { Button } from "@/components/ui/button"
import { SheetFooter } from "@/components/ui/sheet"
import { isEmpty } from "@/lib/utils"
import { useCartStore } from "@/store/cartStore"
import { PackageOpen } from "lucide-react"

export default function EmptyCart() {
  const company = useCompany()
  const [lastCart, restoreLastCart] = useCartStore((s) => [
    s.lastCart,
    s.restoreLastCart
  ])

  if (!company) return <Loader />

  const repeatOrder = () => {
    restoreLastCart()
  }

  return (
    <>
      <div className="flex size-full flex-col items-center justify-center space-y-5">
        <PackageOpen size={128} className="opacity-30" />
        <p>Sua sacola está vazia</p>
        {!isEmpty(lastCart) && (
          <Button onClick={repeatOrder}>Repetir último pedido</Button>
        )}
      </div>
      <SheetFooter>
        <footer className="flex w-full flex-col items-center">
          <Button
            size={"lg"}
            className="h-12 w-full cursor-not-allowed bg-green-600 text-gray-50/50 hover:bg-green-600"
          >
            Finalizar Pedido
          </Button>
        </footer>
      </SheetFooter>
    </>
  )
}
