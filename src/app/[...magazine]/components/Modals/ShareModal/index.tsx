"use client"

import { CopyIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { ReactNode } from "react"
import { WhatsappIcon } from "@/../public/assets/img/copyright-icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getMailURL, getWhatsappURL } from "@/lib/url"
import { useCompany } from "@/app/[...magazine]/hooks/useCompany"
import { copy } from "@/lib/utils"
import { MailIcon } from "lucide-react"

type ShareModalProps = {
  children: ReactNode
}

export default function ShareModal({ children }: ShareModalProps) {
  const company = useCompany()

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-5/6 max-w-sm rounded-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Gostou dos nossos produtos ?
          </DialogTitle>
          <DialogDescription className="text-center">
            Compartilhe essa revista com seus amigos!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-6">
          {typeof window !== "undefined" && (
            <Button
              className="size-16 rounded-full"
              onClick={() => copy(window.location.href)}
            >
              <span className="sr-only">Copiar</span>
              <CopyIcon className="size-6" />
            </Button>
          )}
          {company && (
            <>
              <Link
                href={getMailURL({
                  subject: `Confira os produtos da ${company.name}`,
                  body: `Olá, confira os produtos da ${company.name} nesse catálogo e envie os seus pedidos diretamente pelo Whatsapp!\n${location.href}`
                })}
                target="_blank"
              >
                <Button className="size-16 rounded-full bg-indigo-800 hover:bg-indigo-950">
                  <span className="sr-only">Enviar pelo Email</span>
                  <MailIcon className="size-6" />
                </Button>
              </Link>
              <Link
                href={getWhatsappURL({
                  text: `Olá, confira os produtos da ${company.name} nesse catálogo e envie os seus pedidos diretamente pelo Whatsapp!\n${location.href}`
                })}
                target="_blank"
              >
                <Button className="size-16 rounded-full bg-green-600 hover:bg-green-700">
                  <span className="sr-only">Link para o Whatsapp</span>
                  <WhatsappIcon />
                </Button>
              </Link>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
