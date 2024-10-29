"use client"

import { ReactNode } from "react"
import { useCompany } from "@/app/[...magazine]/hooks/useCompany"

type ShareModalProps = {
  children: ReactNode
}

export default function ShareModal({ children }: ShareModalProps) {
  const company = useCompany()

  return (
    <div>
      <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
        {JSON.stringify(company, null, 2)}
      </code>
      {children}
    </div>
    // <Dialog>
    //   <DialogTrigger asChild>{children}</DialogTrigger>
    //   <DialogContent className="w-5/6 max-w-sm rounded-md">
    //     <DialogHeader>
    //       <DialogTitle className="text-center">
    //         Gostou dos nossos produtos ?
    //       </DialogTitle>
    //       <DialogDescription className="text-center">
    //         Compartilhe essa revista com seus amigos!
    //       </DialogDescription>
    //     </DialogHeader>
    //     <div className="flex items-center justify-center space-x-6">
    //       {typeof window !== "undefined" && (
    //         <Button
    //           className="size-16 rounded-full"
    //           onClick={() => copy(window.location.href)}
    //         >
    //           <span className="sr-only">Copiar</span>
    //           <CopyIcon className="size-6" />
    //         </Button>
    //       )}
    //       {company && (
    //         <>
    //           <Link
    //             href={getMailURL({
    //               subject: `Confira os produtos da ${company.name}`,
    //               body: `Olá, confira os produtos da ${company.name} nesse catálogo e envie os seus pedidos diretamente pelo Whatsapp!\n${location.href}`
    //             })}
    //             target="_blank"
    //           >
    //             <Button className="size-16 rounded-full bg-indigo-800 hover:bg-indigo-950">
    //               <span className="sr-only">Enviar pelo Email</span>
    //               <MailIcon className="size-6" />
    //             </Button>
    //           </Link>
    //           <Link
    //             href={getWhatsappURL({
    //               text: `Olá, confira os produtos da ${company.name} nesse catálogo e envie os seus pedidos diretamente pelo Whatsapp!\n${location.href}`
    //             })}
    //             target="_blank"
    //           >
    //             <Button className="size-16 rounded-full bg-green-600 hover:bg-green-700">
    //               <span className="sr-only">Link para o Whatsapp</span>
    //               <WhatsappIcon />
    //             </Button>
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </DialogContent>
    // </Dialog>
  )
}
