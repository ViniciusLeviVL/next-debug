"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getCatalog } from "@/entities/catalog"
import Catalog from "@/types/Catalog"

export function useCatalog() {
  const [catalog, setCatalog] = useState<Catalog | null>(null)
  const [company_id, catalog_name] = useParams<{
    magazine: [company_id: string, catalog_name: string]
  }>().magazine

  useEffect(() => {
    async function fetchCatalog() {
      const catalog = await getCatalog(company_id, catalog_name)
      if (catalog) {
        setCatalog(catalog)
      }
    }
    fetchCatalog()
  }, [catalog_name, company_id])

  return catalog
}
