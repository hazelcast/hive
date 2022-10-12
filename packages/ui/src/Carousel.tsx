import React, { FC, ReactElement } from 'react'
import * as NukaCarousel from 'nuka-carousel'
import { CarouselProps as NukaCarouselProps } from 'nuka-carousel'
import { ChevronLeft, ChevronRight } from 'react-feather'
import cn from 'classnames'

import styles from './Carousel.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

export type CarouselProps = {
  children: ReactElement[]
  color?: string
  wrapperClassName?: string
} & NukaCarouselProps

/*
 * ### Purpose
 * Overlay is a full-screen modal. Windows under an Overlay are inert. That is, users cannot interact with content outside an active Overlay window.
 * Overlay should be used to drive a more complex actions (e.g. filling and saving forms). In case of a confirmation action, use a Dialog.
 *
 * ### General Info
 * - Overlay always contains a title, cancel button in the top right corner, and content.
 * - To close the Overlay, use cancel button in the top right corner or press "Esc" key.
 */
export const Carousel: FC<CarouselProps> = ({
  children,
  color = styleConsts.colorPrimary,
  wrapperClassName,
  cellSpacing = 15,
  slidesToShow = 1,
  defaultControlsConfig,
  ...props
}) => {
  return (
    <div className={cn(wrapperClassName, styles.wrapper)}>
      <NukaCarousel.default
        slidesToShow={slidesToShow}
        defaultControlsConfig={{
          nextButtonText: defaultControlsConfig?.nextButtonText ?? <ChevronRight size={40} strokeWidth="0.9" color={color} />,
          prevButtonText: defaultControlsConfig?.prevButtonText ?? <ChevronLeft size={40} strokeWidth="0.9" color={color} />,
          nextButtonClassName: cn(defaultControlsConfig?.nextButtonClassName, styles.nextButtonClassName),
          prevButtonClassName: cn(defaultControlsConfig?.prevButtonClassName, styles.prevButtonClassName),
          nextButtonStyle: defaultControlsConfig?.nextButtonStyle ?? { background: 'none' },
          prevButtonStyle: defaultControlsConfig?.prevButtonStyle ?? { background: 'none' },
          pagingDotsClassName: cn(defaultControlsConfig?.pagingDotsClassName, styles.pagingDotsClassName),
          pagingDotsStyle: defaultControlsConfig?.pagingDotsStyle ?? {
            fill: color,
          },
          containerClassName: defaultControlsConfig?.containerClassName,
          nextButtonOnClick: defaultControlsConfig?.nextButtonOnClick,
          pagingDotsContainerClassName: defaultControlsConfig?.pagingDotsContainerClassName,
          pagingDotsOnClick: defaultControlsConfig?.pagingDotsOnClick,
          prevButtonOnClick: defaultControlsConfig?.prevButtonOnClick,
        }}
        cellSpacing={cellSpacing}
        {...props}
      >
        {children}
      </NukaCarousel.default>
    </div>
  )
}
