import { PropsWithChildren } from "react"
import useGoToPage from "../../hooks/useGoToPage"

type MatchingContentProps = PropsWithChildren & {
  page?: number
}

export function MatchingContent({ page, children }: MatchingContentProps) {
  const goTo = useGoToPage()

  if (typeof page === "undefined") return

  return (
    <button
      className="my-2 w-full rounded-md bg-neutral-100 p-2"
      onClick={() => goTo(page - 1)}
    >
      {children}
      <div className="w-full translate-y-1 text-center font-semibold text-neutral-900">
        Página {page}
      </div>
    </button>
  )
}
