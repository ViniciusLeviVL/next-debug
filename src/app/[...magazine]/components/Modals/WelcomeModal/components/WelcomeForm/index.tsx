"use client"

import InputMask from "react-input-mask"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  BaseWelcomeFormSchema,
  getWelcomeFormSchema
} from "./schemas/FormSchema"
import { WelcomePreferences } from "@/types/Catalog"
import { z } from "zod"

type WelcomeFormProps = {
  onSubmit: (data: BaseWelcomeFormSchema) => void
  preferences: WelcomePreferences
}

export default function WelcomeForm({
  onSubmit,
  preferences
}: WelcomeFormProps) {
  const formSchema = getWelcomeFormSchema(preferences)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: ""
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-2 flex flex-col items-center gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-11/12 leading-snug text-neutral-600">
              <FormLabel>
                Nome
                {!preferences.nameIsRequired && (
                  <span className="ml-1 text-xs font-normal text-neutral-500">
                    (Opcional)
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-neutral-400 focus:border-blue-500 focus:shadow-md focus-visible:ring-0"
                  placeholder="Digite seu nome"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="w-11/12 leading-snug ">
              <FormLabel>
                Celular
                {!preferences.phoneIsRequired && (
                  <span className="ml-1 text-xs font-normal text-neutral-500">
                    (Opcional)
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <InputMask
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm text-neutral-600 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:shadow-md focus-visible:outline-none focus-visible:ring-0"
                  mask={"(99) 9 9999-9999"}
                  maskPlaceholder=""
                  type="tel"
                  placeholder="(00) 9 0000-0000"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          className="w-11/12 bg-success hover:bg-green-600"
        >
          Avançar
        </Button>
      </form>
    </Form>
  )
}
