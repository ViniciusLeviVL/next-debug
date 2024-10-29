/* eslint-disable @next/next/no-img-element */
import { getCompany } from "@/entities/company"
import { MagazinePageParams } from "./types"
import { getCatalog } from "@/entities/catalog"
import { notFound } from "next/navigation"
import Carousel from "./components/Carousel"
import Zoom from "./components/Zoom"
import { setCompanyId, setCatalogName } from "./context/paramsContext"

export default async function Main({
  params,
  searchParams
}: MagazinePageParams) {
  const [company_id, catalog_name] = params.magazine

  if (!company_id || !catalog_name) {
    notFound()
  }

  setCompanyId(company_id)
  setCatalogName(catalog_name)
  const company = await getCompany(company_id)
  const catalog = await getCatalog(company_id, catalog_name)

  if (!catalog || !company) {
    notFound()
  }

  function isInitialPage(pageIndex: number): boolean {
    if (!searchParams?.page || isNaN(parseInt(searchParams.page))) {
      return pageIndex === 0 || pageIndex === 1
    }

    let parsedPage = parseInt(searchParams.page) - 1

    if (catalog?.pagesOrder) {
      if (parsedPage > catalog?.pagesOrder?.length)
        parsedPage = catalog.pagesOrder.length
      if (parsedPage < 1) parsedPage = 1
    }

    return parsedPage % 2 === 0
      ? pageIndex - 1 === parsedPage || pageIndex === parsedPage
      : pageIndex === parsedPage || pageIndex + 1 === parsedPage
  }

  return (
    <>
      <Carousel>
        {catalog.pagesOrder?.map((pageFileName, index) => (
          <Zoom key={index}>
            <img
              data-lazy-src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${company_id}/${catalog.id}/paginas/${pageFileName.split(".")[0]}.webp`}
              className={"select-none object-contain max-h-[calc(100dvh-4rem)] overflow-hidden"}
              alt={`Página ${pageFileName.split(".")[0]}`}
              fetchPriority={isInitialPage(index) ? "high" : undefined}
            />
          </Zoom>
        ))}
      </Carousel>
    </>
  )
}
