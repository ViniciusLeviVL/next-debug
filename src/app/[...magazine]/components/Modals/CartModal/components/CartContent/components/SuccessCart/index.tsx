"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import { CopyIcon, MailIcon } from "lucide-react"
import { WhatsappIcon } from "@/../public/assets/img/copyright-icons"
import Image from "next/image"
import ThanksImage from "@/../public/assets/img/thanks.png"
import { useCallback, useEffect } from "react"
import useOrder from "../../hooks/useOrder"
import { getMailURL, getWhatsappURL } from "@/lib/url"
import { useCompany } from "@/app/[...magazine]/hooks/useCompany"
import Link from "next/link"
import { useClientContext } from "@/context/clientContext"
import { copy } from "@/lib/utils"
import Loader from "@/components/presentation/Loader"

export default function SuccessCart({ isOpen }: { isOpen: boolean }) {
  const clientName = useClientContext((s) => s.name)
  const [clearCart, saveLastCart] = useCartStore((s) => [
    s.clearCart,
    s.saveLastCart
  ])
  const order = useOrder()
  const company = useCompany()

  const finishOrder = useCallback(() => {
    setTimeout(() => {
      saveLastCart()
      clearCart()
    }, 400)
  }, [clearCart, saveLastCart])

  useEffect(() => {
    if (isOpen === false) finishOrder()
  }, [isOpen, finishOrder])

  if (!company || !order) return <Loader>Processando seu pedido...</Loader>

  return (
    <div className="flex h-full flex-wrap content-center justify-center gap-x-20 gap-y-10">
      <Image
        className="px-5"
        src={ThanksImage}
        alt="Boneca com vários corações ao seu redor"
      />
      <h1 className="w-full text-center text-xl">
        Obrigado por comprar conosco!
      </h1>
      <h3 className="mb-2 h-0 w-full text-center text-lg">Enviar pedido:</h3>
      <div className="flex min-h-12 w-full items-center justify-evenly">
        <Button
          className="size-16 rounded-full"
          onClick={() => {
            copy(order)
            finishOrder()
          }}
        >
          <span className="sr-only">Copiar Pedido</span>
          <CopyIcon className="size-6" />
        </Button>
        {company.mail && (
          <Link
            href={getMailURL({
              mails: company.mail,
              subject: `Pedido de ${clientName || "Cliente Anônimo"} do Catálogo Digital "${window.location.pathname}"`,
              body: order
            })}
            target="_blank"
          >
            <Button
              onClick={finishOrder}
              className="size-16 rounded-full bg-indigo-800 hover:bg-indigo-950"
            >
              <span className="sr-only">Enviar pelo Email</span>
              <MailIcon className="size-6" />
            </Button>
          </Link>
        )}
        <Link
          href={getWhatsappURL({ text: order, phone: company.phone })}
          target="_blank"
        >
          <Button
            onClick={finishOrder}
            className="size-16 rounded-full bg-green-600 hover:bg-green-700"
          >
            <span className="sr-only">Enviar pelo Whatsapp</span>
            <WhatsappIcon />
          </Button>
        </Link>
      </div>
    </div>
  )
}
