import { MagazinePageParams } from "./types"

export default async function Main({
  params
}: MagazinePageParams) {
  const [company_id, catalog_name] = params.magazine

  return (
    <>
      <p>
        {company_id}  
      </p>
      <p>
        {catalog_name}  
      </p>
    </>
  )
}
