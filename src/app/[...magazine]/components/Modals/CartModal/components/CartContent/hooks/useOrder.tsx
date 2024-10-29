import { useCompany } from "@/app/[...magazine]/hooks/useCompany"
import { useClientContext } from "@/context/clientContext"
import { useCartStore } from "@/store/cartStore"
import { toBRL } from "@/lib/utils"
import { isEmpty } from "@/lib/utils"
import { toast } from "sonner"

export default function useOrder() {
  const cartItems = useCartStore((s) => s.cartItems)
  const clientName = useClientContext((s) => s.name)
  const company = useCompany()

  if (!company) return

  if (isEmpty(cartItems)) {
    toast.error(
      "Ocorreu um erro ao finalizar seu pedido, tente repetir seu último pedido."
    )
    return undefined
  }

  let total = 0
  let order = `Catálogo ${company.name || "Revista Digital"}\nPedido de ${clientName || "Cliente Anônimo"}\n\n`

  cartItems.forEach((item) => {
    total += item.price * item.quantity
    order +=
      `Código: ${item.reference}\n` +
      `${item.reference ? `Ref.: ${item.code}\n` : ""}` +
      `Qtd: ${item.quantity}\n` +
      `Descrição: ${item.description}\n` +
      `${item.color ? `Cor: ${item.color}\n` : ""}` +
      `${item.size ? `Tamanho: ${item.size}\n` : ""}` +
      `Pág.: ${item.page}\n` +
      `Preço unitário: ${toBRL(item.price * 1)}\n` +
      `Total: ${toBRL(item.quantity * item.price)}\n\n`
  })
  order += `\nTotal do Pedido: ${toBRL(total)}`

  return order
}
