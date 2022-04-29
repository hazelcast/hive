import { MutableRefObject, useEffect } from 'react'
import ReactSelect from 'react-select'

type RefElement = MutableRefObject<ReactSelect | undefined>

/** If the size of screen is changed we close dropdown menu to aviod the dropdown menu bug in react-select library.
 * For more information visit: https://github.com/JedWatson/react-select/issues/3533
 */
export const useCloseOnResize = (target: RefElement) => {
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
