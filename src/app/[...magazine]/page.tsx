import { getCompany } from "@/entities/company"
import { MagazinePageParams } from "./types"
import { getCatalog } from "@/entities/catalog"
import { notFound } from "next/navigation"

export default async function Main({
  params
}: MagazinePageParams) {
  const [company_id, catalog_name] = params.magazine

  if (!company_id || !catalog_name) {
    notFound()
  }

  const company = await getCompany(company_id)
  const catalog = await getCatalog(company_id, catalog_name)

  return (
    <>
      <p>
        {company_id}
        {JSON.stringify(company, null, 2)}
      </p>
      <br />
      <br />
      <br />
      <br />
      <p>
        {catalog_name}  
        {JSON.stringify(catalog, null, 2)}
      </p>
    </>
  )
}
