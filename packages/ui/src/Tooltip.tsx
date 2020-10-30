import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { Placement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import cn from 'classnames'

import styles from './Tooltip.module.scss'

export type TooltipProps = {
  content: ReactNode
  id: string
  hideTimeoutDuration?: number
  offset?: number
  placement?: Placement
  visible?: boolean
  children: (ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => ReactNode
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
 *
 * ### Usage
 * Wrap the target element with Tooltip component and use the "content" property to define what should be displayed inside the tooltip.
 */
export const Tooltip: FC<TooltipProps> = ({
  id,
  content,
  hideTimeoutDuration = 100,
  offset = 10,
  placement = 'top',
  visible: visibilityOverride,
  children,
  ...props
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

  const { styles: popperStyles, attributes: popperAttributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
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

  const onMouseEnter = useCallback(() => {
    if (hideTimeout !== null) {
      clearTimeout(hideTimeout)
    }

    setShown(true)
  }, [hideTimeout])

  const onMouseLeave = useCallback(() => {
    setHideTimeout(setTimeout(() => setShown(false), hideTimeoutDuration))
  }, [hideTimeoutDuration])

  useEffect(() => {
    referenceElement?.addEventListener('mouseenter', onMouseEnter)
    popperElement?.addEventListener('mouseenter', onMouseEnter)

    return () => {
      referenceElement?.removeEventListener('mouseenter', onMouseEnter)
      popperElement?.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [referenceElement, popperElement, onMouseEnter])

  useEffect(() => {
    referenceElement?.addEventListener('mouseleave', onMouseLeave)
    popperElement?.addEventListener('mouseleave', onMouseLeave)

    return () => {
      referenceElement?.removeEventListener('mouseleave', onMouseLeave)
      popperElement?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [referenceElement, popperElement, onMouseLeave])

  // Makes sure "visible" prop can override local "isShown" state
  const isTooltipVisible = visibilityOverride ?? isShown

  return (
    <>
      {children(setReferenceElement)}

      {content !== undefined && (
        <>
          <span id={id} className={styles['tooltip-sr']} role="tooltip" data-test="tooltip-sr">
            {content}
          </span>

          <span
            ref={setPopperElement}
            className={cn(styles.overlay, {
              [styles.hidden]: !isTooltipVisible,
            })}
            style={popperStyles.popper}
            data-test="tooltip-overlay"
            aria-hidden="true"
            {...popperAttributes.popper}
            {...props}
          >
            {content}

            <span
              ref={setArrowElement}
              className={styles.arrow}
              style={popperStyles.arrow}
              data-test="tooltip-arrow"
              {...popperAttributes.arrow}
            />
          </span>
        </>
      )}
    </>
  )
}
