/* eslint-disable @next/next/no-img-element */
import { getCompany } from "@/entities/company"
import { MagazinePageParams } from "./types"
import { getCatalog } from "@/entities/catalog"
import { notFound } from "next/navigation"
import Carousel from "./components/Carousel"
import Zoom from "./components/Zoom"

export default async function Main({
  params
}: MagazinePageParams) {
  const [company_id, catalog_name] = params.magazine

  if (!company_id || !catalog_name) {
    notFound()
  }

  const company = await getCompany(company_id)
  const catalog = await getCatalog(company_id, catalog_name)

  if (!catalog || !company) {
    notFound()
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
            />
          </Zoom>
        ))}
      </Carousel>
    </>
  )
}
