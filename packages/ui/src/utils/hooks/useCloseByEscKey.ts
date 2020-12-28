import { useEffect } from 'react'

type CallbackFunction = (e?: KeyboardEvent) => void

// `callback stack` to track callers of useCloseByEscKey
const _cbStack: CallbackFunction[] = []

function _removeFromStack(cb: CallbackFunction) {
  const idx = _cbStack.indexOf(cb)
  if (idx > -1) {
    _cbStack.splice(idx, 1)
  }
}

export const useCloseByEscKey = (cb: CallbackFunction) => {
  useEffect(() => {
    function handleKeyDown(nativeEvent: KeyboardEvent) {
      // 'Esc' -> IE/Edge specific value
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        // check if the last callback on the stack is this cb.
        const lastCb = _cbStack.length ? _cbStack[_cbStack.length - 1] : null
        if (cb && lastCb === cb) {
          // if so, invoke it and remove it from the stack.
          _removeFromStack(cb)
          cb(nativeEvent)
        }
      }
    }

    // register this callback
    _cbStack.push(cb)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // unregister this callback
      _removeFromStack(cb)
    }
  }, [cb])

  return null
}
