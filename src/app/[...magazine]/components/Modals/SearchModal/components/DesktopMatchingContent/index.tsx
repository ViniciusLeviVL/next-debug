import { isEven } from "@/lib/utils"
import Image from "next/image"
import { useCatalog } from "@/app/[...magazine]/hooks/useCatalog"
import { MatchingContent } from "../MatchingContent"
import { Skeleton } from "@/components/ui/skeleton"

type DesktopMatchingContentProps = {
  matchingFiles: number[]
}

export default function DesktopMatchingContent({
  matchingFiles
}: DesktopMatchingContentProps) {
  const catalog = useCatalog()

  const getPageIndex = (pageFileNumber: number) =>
    catalog?.pagesOrder.findIndex(
      (fileName) => Number(fileName.split(".")[0]) === pageFileNumber
    )

  const parseToDesktopPage = (page: number) =>
    isEven(page) ? page / 2 : page / 2 + 0.5

  return matchingFiles.map((pageNumber, index) => {
    const pageIndex = getPageIndex(pageNumber)

    if (
      parseToDesktopPage(pageIndex ?? 0) ===
      parseToDesktopPage(getPageIndex(matchingFiles[index - 1]) ?? 0)
    )
      return

    const pagePair = isEven(pageNumber)
      ? [pageNumber - 1, pageNumber]
      : [pageNumber - 2, pageNumber - 1]

    return (
      <MatchingContent key={index} page={parseToDesktopPage(pageIndex ?? 0)}>
        <div className="flex w-full justify-between">
          {catalog ? (
            <>
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${catalog?.company_id}/${catalog?.id}/paginas/${pagePair[0]}.webp`}
                alt={`Página ${pageIndex}`}
                className={"w-1/2"}
                loading="lazy"
                width={147.5}
                height={211}
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${catalog?.company_id}/${catalog?.id}/paginas/${pagePair[1]}.webp`}
                alt={`Página ${pageIndex}`}
                className="w-1/2"
                loading="lazy"
                width={147.5}
                height={211}
              />
            </>
          ) : (
            <>
              <Skeleton className="h-[211px] w-1/2 max-w-[147.5px] rounded-none" />
              <Skeleton className="h-[211px] w-1/2 max-w-[147.5px] rounded-none" />
            </>
          )}
        </div>
      </MatchingContent>
    )
  })
}
