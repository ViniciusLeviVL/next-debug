export const BR = "%0A" // Quebra de Linha
export const WS = "%20" // Espaço em Branco

// export function getURLWithSearchParams(
//   url: string | URL,
//   searchParams?: object
// ) {
//   const createdUrl = new URL(url)

//   if (searchParams)
//     createdUrl.search = parseToURLSearchParams(searchParams).toString()

//   return createdUrl
// }

// export function parseToURLSearchParams(obj: object): URLSearchParams {
//   const searchParamsArr = Object.entries(obj).filter(
//     (arr) => arr[1] && arr[1] !== false
//   )

//   return new URLSearchParams(searchParamsArr)
// }

export const whatsappBaseURL = "https://api.whatsapp.com"

export function getWhatsappURL(options?: {
  text?: string
  phone?: string | null
}) {
  const textParam = options?.text ? `text=${options.text}` : null
  const phoneParam = options?.phone ? `phone=${options.phone}` : null

  const searchParams = 
    ((textParam && phoneParam) ? `?${textParam}&${phoneParam}` 
    : (!textParam && !phoneParam) ? "" 
    : textParam ? `?${textParam}` 
    : phoneParam ? `?${phoneParam}`
    : "").replaceAll("\n", BR)

  return `${whatsappBaseURL}/send${searchParams}`
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

  const subjectParam = options.subject ? `subject=${options.subject}` : null
  const bodyParam = options.body ? `body=${options.body}` : null

  const searchParams = 
    ((subjectParam && bodyParam) ? `?${subjectParam}&${bodyParam}` 
    : (!subjectParam && !bodyParam) ? "" 
    : subjectParam ? `?${subjectParam}` 
    : bodyParam ? `?${bodyParam}`
    : "").replaceAll("\n", BR)

  return `mailto:${mailStr ?? ""}${searchParams}`
}
