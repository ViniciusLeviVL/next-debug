import Image from "next/image"
import { useCatalog } from "@/app/[...magazine]/hooks/useCatalog"
import { MatchingContent } from "../MatchingContent"
import Loader from "@/components/presentation/Loader"

type MobileMatchingContentProps = {
  matchingFiles: number[]
}

export default function MobileMatchingContent({
  matchingFiles
}: MobileMatchingContentProps) {
  const catalog = useCatalog()

  return matchingFiles.map((fileNumber, index) => {
    const pageIndex =
      (catalog?.pagesOrder.findIndex(
        (fileName) => Number(fileName.split(".")[0]) === fileNumber
      ) ?? -2) + 1
    return (
      <MatchingContent key={index} page={pageIndex}>
        {catalog ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${catalog?.company_id}/${catalog?.id}/paginas/${fileNumber}.webp`}
            alt={`Página ${pageIndex}`}
            className="w-full"
            loading="lazy"
            width={295}
            height={423}
          />
        ) : (
          <div className="h-[423px] max-w-[295px]">
            <Loader />
          </div>
        )}
      </MatchingContent>
    )
  })
}
