import { httpRequest } from "@/lib/http"
import Company from "@/types/Company"

export async function getCompanyIdByHostname(
  hostname: string
): Promise<number | undefined> {
  try {
    if (hostname === process.env.NEXT_PUBLIC_DEFAULT_HOSTNAME) return undefined

    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/getIdByHostname?hostname=${hostname}`
    )
    const res = await httpRequest(url)

    if (res) {
      return (await res.json()).id
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getCompany(company_id: string): Promise<Company | null> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/${company_id}`
  )

  try {
    const response = await httpRequest(url, {
      next: { tags: [`get_company_${company_id}`] }
    })
    if (!response || response.status === 404) return null
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getDefaultCatalogPathByCompanyId(
  company_id: number
): Promise<string | undefined> {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/getDefaultCatalogPath/${company_id}`
    )

    const res = await httpRequest(url)

    if (!res || res.status === 404) return undefined

    return (await res.json()).path
  } catch (error) {
    console.error(error)
  }
}

export async function saveWelcomeData({
  company_id,
  name,
  phone
}: {
  company_id: number
  name?: string
  phone?: string
}): Promise<string | undefined> {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/saveWelcomeData`
    )

    const res = await httpRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company_id,
        name,
        phone
      })
    })

    if (res && res.ok) return (await res.json()).message
  } catch (error) {
    console.error(error)
  }
}
