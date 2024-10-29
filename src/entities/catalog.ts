import Catalog from "@/types/Catalog"
import { httpRequest } from "@/lib/http"

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog`

export async function getCatalog(
  company_id: string,
  catalog_name: string
): Promise<Catalog | null> {
  const url = new URL(`${BASE_URL}/${company_id}/${catalog_name}`)

  try {
    const response = await httpRequest(url, {
      next: { tags: [`get_catalog_${company_id}`] }
    })
    if (!response || response.status === 404) return null
    return response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function searchPages(
  searchTerm: string,
  company_id: string,
  catalog_id: string
): Promise<number[] | null> {
  const url = new URL(`${BASE_URL}/search`)

  const url_search = new URLSearchParams({
    searchTerm,
    company_id,
    catalog_id
  })

  url.search = url_search.toString()

  try {
    const response = await httpRequest(url, {
      next: { tags: [`search_${company_id}`] }
    })
    if (!response || response.status === 404) return null
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}
