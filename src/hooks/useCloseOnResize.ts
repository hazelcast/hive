import { MutableRefObject, useEffect } from 'react'
import { SelectInstance } from 'react-select'

type RefElement<V, IsMulti extends boolean> = MutableRefObject<SelectInstance<V, IsMulti> | null>

/** If the size of screen is changed we close dropdown menu to aviod the dropdown menu bug in react-select library.
 * For more information visit: https://github.com/JedWatson/react-select/issues/3533
 */
export const useCloseOnResize = <V, IsMulti extends boolean = false>(target: RefElement<V, IsMulti>) => {
  const handleResize = () => {
    if (target.current) {
      target.current.onMenuClose()
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })
}
