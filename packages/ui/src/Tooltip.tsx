import React, { FC, ReactNode, useCallback, useState, useImperativeHandle, MutableRefObject, ReactText, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { Placement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import useEvent from 'react-use/lib/useEvent'
import cn from 'classnames'

import { canUseDOM } from './utils/ssr'

import styles from './Tooltip.module.scss'

export type TooltipContainer = 'body' | 'referenceElement' | HTMLElement

const getTooltipPortalContainer = (tooltipContainer: TooltipContainer, referenceElement: HTMLElement | null): HTMLElement | null => {
  if (tooltipContainer === 'body') {
    // There is no document is SSR environment
    return canUseDOM ? document.body : null
  }

  if (tooltipContainer === 'referenceElement') {
    return referenceElement ?? null
  }

  return tooltipContainer
}

export type PopperRef = ReturnType<typeof usePopper>

export type TooltipProps = {
  content: ReactNode
  id: string
  hideTimeoutDuration?: number
  offset?: number
  padding?: number
  placement?: Placement
  visible?: boolean
  children: (ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => ReactNode
  popperRef?: MutableRefObject<PopperRef | undefined>
  updateToken?: ReactText | boolean
  tooltipContainer?: TooltipContainer
}

/**
 * ### Purpose
 * Useful when you need to display additional information/actionable content.
 * A tooltip with this content is displayed when user hovers over a target element.
 *
 * ### General info
 * - Tooltip automatically detects viewport overflow and changes placement to prevent it.
 * - Offset (space between a target and tooltip elements) can be also configured via "offset" property.
 * - If "content" property is undefined, tooltip element will be removed from DOM entirely.
 * - It's required to set the "id" property which will be assigned to the tooltip. This id parameter can be then used as a value of "aria-labelledby" attribute.
 * - Use `updateToken` prop to update the tooltip position.
 * - Use `tooltipContainer` prop to change the tooltip portal container. Defaults to `body`.
 *
 * ### Usage
 * Wrap the target element with Tooltip component and use the "content" property to define what should be displayed inside the tooltip.
 */
export const Tooltip: FC<TooltipProps> = ({
  id,
  content,
  hideTimeoutDuration = 100,
  offset = 10,
  padding = 10,
  placement = 'top',
  visible: visibilityOverride,
  children,
  popperRef,
  updateToken,
  tooltipContainer = 'body',
}) => {
  const [isShown, setShown] = useState<boolean>(false)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)

  /*
   * We're using useState instead of useRef because react-popper package has some issues with useRef:
   * https://github.com/popperjs/react-popper/issues/241#issuecomment-591411605
   */
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLSpanElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLSpanElement | null>(null)

  const popper = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
          padding,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, offset],
        },
      },
    ],
  })

  useImperativeHandle(popperRef, () => popper, [popper])

  const onMouseEnter = useCallback(() => {
    if (hideTimeout !== null) {
      clearTimeout(hideTimeout)
    }

    setShown(true)
  }, [hideTimeout])

  const onMouseLeave = useCallback(() => {
    setHideTimeout(setTimeout(() => setShown(false), hideTimeoutDuration))
  }, [hideTimeoutDuration])

  useEvent('mouseenter', onMouseEnter, referenceElement)
  useEvent('mouseleave', onMouseLeave, referenceElement)

  useEvent('mouseenter', onMouseEnter, popperElement)
  useEvent('mouseleave', onMouseLeave, popperElement)

  // Makes sure "visible" prop can override local "isShown" state
  const isTooltipVisible = visibilityOverride ?? isShown

  // Update the tooltip's position (useful when resizing table columns)
  useLayoutEffect(() => {
    if (content) {
      void popper?.update?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTooltipVisible, updateToken])

  const tooltipPortalContainer = getTooltipPortalContainer(tooltipContainer, referenceElement)

  return (
    <>
      {children(setReferenceElement)}

      {content !== undefined && (
        <>
          <span id={id} className={styles.tooltipSr} role="tooltip" data-test="tooltip-sr">
            {content}
          </span>
          {tooltipPortalContainer &&
            ReactDOM.createPortal(
              <>
                <span
                  ref={setPopperElement}
                  className={cn(styles.overlay, {
                    [styles.hidden]: !isTooltipVisible,
                  })}
                  style={popper.styles.popper}
                  data-test="tooltip-overlay"
                  aria-hidden
                  {...popper.attributes.popper}
                >
                  {content}
                  <span
                    ref={setArrowElement}
                    className={styles.arrow}
                    style={popper.styles.arrow}
                    data-test="tooltip-arrow"
                    {...popper.attributes.arrow}
                  />
                </span>
              </>,
              tooltipPortalContainer,
            )}
        </>
      )}
    </>
  )
}
