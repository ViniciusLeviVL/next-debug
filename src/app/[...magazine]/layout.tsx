import { ReactNode } from "react"
import WelcomeModal from "./components/Modals/WelcomeModal"

export default async function MagazineLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <main className="relative mx-auto flex w-full max-w-7xl flex-grow items-center justify-center overflow-hidden max-height-lg:max-w-5xl">
        {children}
      </main>
      <WelcomeModal />
    </>
  )
}
