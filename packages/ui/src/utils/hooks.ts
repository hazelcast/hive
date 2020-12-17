// todo: mv file to hooks/useCloseByEscKey?

import { useEffect } from 'react'

// `callback stack` to track callers of useCloseByEscKey
let _cbStack: Function[] = []

function _removeFromStack(cb: Function) {
  const idx = _cbStack.indexOf(cb);
  if (idx > -1) {
    _cbStack.splice(idx, 1);
  }
}

export function useCloseByEscKey(cb: Function) {
  useEffect(() => {
    function handleKeyDown(nativeEvent: any) {
      // 'Esc' -> IE/Edge specific value
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        // check if the last callback on the stack is this cb.
        const lastCb = _cbStack.length ? _cbStack[_cbStack.length - 1] : null
        if (cb && lastCb === cb) {
          // if so, invoke it and remove it from the stack.
          cb(nativeEvent)
          _removeFromStack(cb)

          // todo: research usecases.
          // nativeEvent.stopPropagation()
        }
      }
    }

    // register this callback
    _cbStack.push(cb)
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // unregister this callback
      _removeFromStack(cb)
    };
  }, []);

  return null
}
