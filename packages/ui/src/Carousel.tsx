import React, { CSSProperties, FC, ReactElement, ReactNode } from 'react'
import * as NukaCarousel from 'nuka-carousel'
import { CarouselProps as NukaCarouselProps } from 'nuka-carousel'
import { ChevronLeft, ChevronRight } from 'react-feather'
import cn from 'classnames'

import styles from './Carousel.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

interface ControlsConfig {
  containerClassName?: string
  nextButtonClassName?: string
  nextButtonOnClick?: React.MouseEventHandler
  nextButtonStyle?: CSSProperties
  nextButtonContent?: ReactNode
  pagingDotsClassName?: string
  pagingDotsContainerClassName?: string
  pagingDotsOnClick?: React.MouseEventHandler
  pagingDotsStyle?: CSSProperties
  prevButtonClassName?: string
  prevButtonOnClick?: React.MouseEventHandler
  prevButtonStyle?: CSSProperties
  prevButtonContent?: ReactNode
}

export type CarouselProps = {
  children: ReactElement[]
  color?: string
  wrapperClassName?: string
  defaultControlsConfig?: ControlsConfig
} & Omit<NukaCarouselProps, 'defaultControlsConfig'>

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
          nextButtonText: defaultControlsConfig?.nextButtonContent ?? <ChevronRight size={40} strokeWidth="0.9" color={color} />,
          prevButtonText: defaultControlsConfig?.prevButtonContent ?? <ChevronLeft size={40} strokeWidth="0.9" color={color} />,
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
