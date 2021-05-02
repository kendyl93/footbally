import { useRef, useEffect } from 'react'

const useInterval = (callback: () => void, timeout: number) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!timeout) {
      return
    }

    const id = setInterval(() => savedCallback.current(), timeout)

    return () => clearInterval(id)
  }, [timeout])
}

export default useInterval
