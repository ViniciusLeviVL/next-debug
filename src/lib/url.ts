export const BR = "%0A" // Quebra de Linha
export const WS = "%20" // Espaço em Branco

export function getURLWithSearchParams(
  url: string | URL,
  searchParams?: object
) {
  const createdUrl = new URL(url)

  if (searchParams)
    createdUrl.search = parseToURLSearchParams(searchParams).toString()

  return createdUrl
}

export function parseToURLSearchParams(obj: object): URLSearchParams {
  const searchParamsArr = Object.entries(obj).filter(
    (arr) => arr[1] && arr[1] !== false
  )

  return new URLSearchParams(searchParamsArr)
}

export const whatsappBaseURL = "https://api.whatsapp.com"

export function getWhatsappURL(options?: {
  text?: string
  phone?: string | null
}) {
  return getURLWithSearchParams(new URL("/send", whatsappBaseURL), options)
}

export function getMailURL({
  mails,
  ...options
}: {
  mails?: string | null
  subject?: string
  body?: string
}) {
  let mailStr

  if (mails) {
    const mailsArr = mails.split("|")

    mailStr = mailsArr.length > 1 ? mailsArr.join(", ") + "," : mailsArr[0]
  }

  return getURLWithSearchParams(`mailto:${mailStr ?? ""}`, options)
    .toString()
    .replaceAll("+", WS)
}
