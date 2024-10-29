import { useEffect, useState } from "react"

export default function useCountdown(
  onTimeUp: () => void,
  initialTime: number
) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [called, setCalled] = useState(false)

  useEffect(() => {
    if (called) return
    if (timeLeft > 0) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else {
      onTimeUp()
      setCalled(true)
    }
  }, [timeLeft, onTimeUp, called])

  return timeLeft
}
