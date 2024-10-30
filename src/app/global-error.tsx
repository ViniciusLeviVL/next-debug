"use client"
export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <html>
      <body>
        <div>
          <h2>Ocorreu um erro interno!</h2>
          <h1>Error Name</h1>
          <pre>{JSON.stringify(error.name, null, 2)}</pre>
          <h1>Error Message</h1>
          <pre>{JSON.stringify(error.message, null, 2)}</pre>
          <h1>Error Digest</h1>
          <pre>{JSON.stringify(error.digest, null, 2)}</pre>
          <h1>Error Stack</h1>
          <pre>{JSON.stringify(error.stack, null, 2)}</pre>
          <h1>Error Cause</h1>
          <pre>{JSON.stringify(error.cause, null, 2)}</pre>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Tentar Novamente
          </button>
        </div>
      </body>
    </html>
  )
}