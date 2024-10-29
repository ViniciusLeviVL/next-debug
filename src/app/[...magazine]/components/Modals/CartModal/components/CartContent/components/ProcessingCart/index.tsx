"use client"

import { useCatalog } from "@/app/[...magazine]/hooks/useCatalog"
import Loader from "@/components/presentation/Loader"
import { useClientContext } from "@/context/clientContext"
import { useCartStore } from "@/store/cartStore"
import { httpRequest } from "@/lib/http"
import { useEffect } from "react"
import ErrorRulesValidation from "../../types/ErrorRulesValidation"

type ProcessingCartProps = {
  onSuccess: () => void
  onError: (errorMessages: string[]) => void
}

export default function ProcessingCart({
  onSuccess,
  onError
}: ProcessingCartProps) {
  const clientName = useClientContext((s) => s.name)
  const cartItems = useCartStore((s) => s.cartItems)
  const catalog = useCatalog()

  useEffect(() => {
    async function processOrder() {
      // Don't do request if in development environment
      if (process.env.NODE_ENV === "development") return onSuccess()
      try {
        if (!catalog)
          throw new Error("Não foi possível acessar os dados do catalogo!")

        const response = await httpRequest(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/processOrder`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              catalog_id: catalog.id,
              company_id: catalog.company_id,
              clientName,
              cartItems
            })
          }
        )

        switch (response?.status) {
          case 201:
            onSuccess()
            break
          case 422:
            onError(
              (await response.json()).errors.map(
                (error: ErrorRulesValidation) => error.message
              )
            )
            break
          default:
            onError(["Ocorreu um erro ao processar seu pedido!"])
            break
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (catalog) processOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog])
  return <Loader>Processando seu pedido...</Loader>
}
