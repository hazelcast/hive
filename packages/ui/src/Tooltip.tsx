import React, {
  FC,
  ReactNode,
  useCallback,
  useState,
  useImperativeHandle,
  MutableRefObject,
  ReactText,
  useLayoutEffect,
  createContext,
  useContext,
  useMemo,
  useRef,
  useEffect,
  MouseEventHandler,
} from 'react'
import ReactDOM from 'react-dom'
import { Placement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import cn from 'classnames'

import { containsElement } from './hooks'
import { canUseDOM } from './utils/ssr'

import styles from './Tooltip.module.scss'

const tooltipZIndex = 20

const TooltipContext = createContext<{
  hide: () => void
  clearHideTimeout: () => void
  popperElement: HTMLSpanElement | null
  referenceElement: HTMLSpanElement | null
} | null>(null)

export type TooltipContainer = 'body' | 'referenceElement' | HTMLElement

const getTooltipPortalContainer = (tooltipContainer: TooltipContainer, referenceElement: HTMLSpanElement | null): HTMLElement | null => {
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
  hoverAbleTooltip?: boolean
  children: (
    ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    onMouseEnter?: MouseEventHandler<Element>,
    onMouseLeave?: MouseEventHandler<Element>,
  ) => ReactNode
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
  hoverAbleTooltip = true,
}) => {
  const [isShown, setShown] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const context = useContext(TooltipContext)

  const clearHideTimeout = useCallback(() => {
    const timeoutId = timeoutRef.current

    context?.clearHideTimeout()

    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
  }, [context])

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
    clearHideTimeout()
    setShown(true)
  }, [clearHideTimeout])

  const onMouseLeave = useCallback(
    (event?: Event) => {
      const e = event as MouseEvent
      const { relatedTarget } = e ?? {}

      timeoutRef.current = setTimeout(() => {
        if (relatedTarget) {
          if (
            !containsElement(context?.referenceElement, relatedTarget as Node) &&
            !containsElement(context?.popperElement, relatedTarget as Node)
          ) {
            context?.hide()
          }
        }
        setShown(false)
      }, hideTimeoutDuration)
    },
    [hideTimeoutDuration, context],
  )

  const contextValue = useMemo(
    () => ({
      popperElement,
      referenceElement,
      hide: onMouseLeave,
      clearHideTimeout,
    }),
    [onMouseLeave, clearHideTimeout, popperElement, referenceElement],
  )

  // Makes sure "visible" prop can override local "isShown" state
  const isTooltipVisible = visibilityOverride ?? isShown

  // Update the tooltip's position (useful when resizing table columns)
  useLayoutEffect(() => {
    if (content) {
      void popper?.update?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTooltipVisible, updateToken])
  useEffect(() => {
    return () => {
      clearHideTimeout()
    }
  }, [clearHideTimeout])
  useEffect(() => {
    referenceElement?.addEventListener('mouseenter', onMouseEnter, false)
    referenceElement?.addEventListener('mouseleave', onMouseLeave, false)

    return () => {
      referenceElement?.removeEventListener('mouseenter', onMouseEnter)
      referenceElement?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [referenceElement, onMouseEnter, onMouseLeave])
  useEffect(() => {
    if (hoverAbleTooltip) {
      popperElement?.addEventListener('mouseenter', onMouseEnter, false)
      popperElement?.addEventListener('mouseleave', onMouseLeave, false)
    }

    return () => {
      popperElement?.removeEventListener('mouseenter', onMouseEnter)
      popperElement?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [popperElement, onMouseEnter, onMouseLeave, hoverAbleTooltip])

  const tooltipPortalContainer = getTooltipPortalContainer(tooltipContainer, referenceElement)

  return (
    <TooltipContext.Provider value={contextValue}>
      {children(setReferenceElement, onMouseEnter, (e: unknown) => {
        onMouseLeave(e as Event)
      })}

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
                  style={{ ...popper.styles.popper, ...{ zIndex: context ? tooltipZIndex + 1 : tooltipZIndex } }}
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
    </TooltipContext.Provider>
  )
}
