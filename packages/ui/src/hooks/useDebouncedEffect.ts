import { DependencyList, useEffect, useState } from 'react'

export const useDebouncedEffect = <T>(effect: () => T, deps: DependencyList, delay = 200) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timer) {
      clearTimeout(timer)
    }

    const newTimer = setTimeout(() => {
      effect()
    }, delay)

    setTimer(newTimer)

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
