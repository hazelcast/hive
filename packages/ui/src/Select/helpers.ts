import { Options, GroupBase } from 'react-select'

import { canUseDOM } from '../utils/ssr'

export type SelectFieldOption<V> = {
  label: string
  value: V
}

export type SelectFieldOptionsMap<V> = {
  [key: string]: SelectFieldOption<V>
}

const isSimpleOption = <V>(option: GroupBase<SelectFieldOption<V>> | SelectFieldOption<V>): option is SelectFieldOption<V> =>
  !!(option as SelectFieldOption<V>).value

export const getOptionsMap = <V extends string | number>(
  options: Options<SelectFieldOption<V>> | ReadonlyArray<SelectFieldOption<V>>,
): SelectFieldOptionsMap<V> =>
  // need this type assertion because of the TS issue https://github.com/microsoft/TypeScript/issues/7294
  (options as Array<GroupBase<SelectFieldOption<V>> | SelectFieldOption<V>>).reduce(
    (acc: SelectFieldOptionsMap<V>, optionOrGroup: GroupBase<SelectFieldOption<V>> | SelectFieldOption<V>): SelectFieldOptionsMap<V> => {
      // if it's a simple non-group option
      if (isSimpleOption(optionOrGroup)) {
        acc[optionOrGroup.value] = optionOrGroup
        // else it's a group option
      } else {
        optionOrGroup.options.reduce((innerAcc: SelectFieldOptionsMap<V>, option: SelectFieldOption<V>) => {
          innerAcc[option.value] = option
          return innerAcc
        }, acc)
      }
      return acc
    },
    {} as SelectFieldOptionsMap<V>,
  )

export const getMenuContainer = (menuPortalTarget: 'body' | 'self' | HTMLElement | null): HTMLElement | null | undefined => {
  if (menuPortalTarget == 'body') {
    // There is no document is SSR environment
    return canUseDOM ? document.body : undefined
  }
  if (menuPortalTarget == 'self') {
    return undefined
  }
  return menuPortalTarget
}
