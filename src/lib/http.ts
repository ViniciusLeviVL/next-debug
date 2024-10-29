export async function httpRequest(
  url: string | URL | Request,
  config?: RequestInit
) {
  try {
    const response = await fetch(url, config)
    return response
  } catch (error) {
    console.log(error)
  }
}
