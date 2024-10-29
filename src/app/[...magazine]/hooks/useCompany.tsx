"use client"

import Company from "@/types/Company"
import { getCompany } from "@/entities/company"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

export function useCompany() {
  const [company, setCompany] = useState<Company | null>(null)
  const [company_id, catalog_name] = useParams<{
    magazine: [company_id: string, catalog_name: string]
  }>().magazine

  useEffect(() => {
    async function fetchCompany() {
      const company = await getCompany(company_id)
      if (company) {
        setCompany(company)
      }
    }
    fetchCompany()
  }, [catalog_name, company_id])

  return company
}
