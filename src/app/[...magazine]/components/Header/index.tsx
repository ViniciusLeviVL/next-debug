import MenuTrigger from "./components/presentation/MenuTrigger"
import ShareTrigger from "./components/presentation/ShareTrigger"
import CartTrigger from "./components/presentation/CartTrigger"
import HomeButton from "./components/presentation/HomeButton"
import PageCounter from "./components/PageCounter"
import BackButton from "./components/presentation/BackButton"

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-center bg-white">
      <div className="mx-3 mt-1 flex h-9 w-full max-w-7xl justify-between">
        <section className="flex items-center space-x-5">
          <BackButton />
          <MenuTrigger />
          <ShareTrigger />
          <HomeButton />
        </section>
        <section className="mx-auto hidden flex-grow justify-center space-x-5 3xs:flex">
          <PageCounter />
        </section>
        <section className="flex items-center justify-end space-x-5">
          <CartTrigger />
        </section>
      </div>
    </header>
  )
}
