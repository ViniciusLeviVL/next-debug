import { phoneToBR } from "@/lib/utils"
import { WelcomePreferences } from "@/types/Catalog"
import { z } from "zod"

const regex = /\+[0-9]{4}9[6-9]{1}[0-9]{7}/

const nameSchema = z.string()
const phoneNumberSchema = z.string().transform((value, ctx) => {
  if (!value) return value
  const phoneNumber = phoneToBR(value)
  if (regex.test(phoneNumber)) return phoneNumber
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Telefone inválido!"
  })
  return z.NEVER
})

export const baseWelcomeFormSchema = z
  .object({
    name: nameSchema,
    phoneNumber: phoneNumberSchema
  })
  .partial()

export type BaseWelcomeFormSchema = z.infer<typeof baseWelcomeFormSchema>

export function getWelcomeFormSchema(preferences: WelcomePreferences) {
  return z.object({
    name: preferences.nameIsRequired
      ? nameSchema.min(2, {
          message: "Digite seu nome."
        })
      : nameSchema.optional(),
    phoneNumber: preferences.phoneIsRequired
      ? phoneNumberSchema.refine((val) => regex.test(val), {
          message: "Digite seu número de celular."
        })
      : phoneNumberSchema.optional()
  })
}
// name: preferences.nameIsRequired ? true : undefined,
// phoneNumber: preferences.phoneIsRequired ? true : undefined
