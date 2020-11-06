import React, { FC, HTMLProps } from 'react'
import { Button } from '../src/Button'

import { Tooltip } from '../src/Tooltip'

import utilStyles from './utils.scss'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
}

const Container: FC<HTMLProps<HTMLDivElement>> = ({
  children,
  style,
  ...props
}) => (
  <div
    className={utilStyles.wrapperCentered}
    style={{ padding: 100, ...style }}
    {...props}
  >
    {children}
  </div>
)

export const Default = () => (
  <Container>
    <Tooltip id="tooltip-default" content={'Tooltip content'}>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-default">
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

Default.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/kaC3jgqMSgqMEgnv7TIse1/%F0%9F%93%90Sign-in-flow?node-id=118%3A2349',
  },
}

export const AutoPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-auto"
      placement="auto"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-auto">
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const AutoStartPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-auto-start"
      placement="auto-start"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-auto-start"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const AutoEndPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-auto-end"
      placement="auto-end"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-auto-end"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const TopPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-top"
      placement="top"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-top">
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const TopStartPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-top-start"
      placement="top-start"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-top-start"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const TopEndPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-top-end"
      placement="top-end"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-top-end">
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const RightPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-right"
      placement="right"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-right">
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const RightStartPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-right-start"
      placement="right-start"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-right-start"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const RightEndPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-right-end"
      placement="right-end"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-right-start"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const BottomPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-bottom"
      placement="bottom"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-bottom">
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const BottomStartPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-bottom-start"
      placement="bottom-start"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-bottom-start"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const BottomEndPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-bottom-end"
      placement="bottom-end"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-bottom-end"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const LeftPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-left"
      placement="left"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-left">
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const LeftStartPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-left-start"
      placement="left-start"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-left-start"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const LeftEndPlacement = () => (
  <Container>
    <Tooltip
      id="tooltip-placement-left-end"
      placement="left-end"
      content={'Tooltip content'}
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-placement-left-end"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const InteractiveContent = () => (
  <Container style={{ padding: 250 }}>
    <Tooltip
      id="tooltip-interactive-content"
      content={
        <>
          <p>
            Parley come about mutiny swing the lead to go on account
            run a shot across the bow schooner fathom bounty carouser.
            Maroon killick keel driver scourge of the seven seas Jolly
            Roger hands spyglass Brethren of the Coast booty. Boom
            rigging gally Plate Fleet pink dance the hempen jig bilge
            water measured fer yer chains take a caulk tender.
          </p>

          <Button>Aye Captain!</Button>
        </>
      }
      visible
    >
      {(ref) => (
        <Button
          ref={ref}
          aria-labelledby="tooltip-interactive-content"
        >
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)

export const VisibleFalse = () => (
  <Container>
    <Tooltip
      id="tooltip-disabled"
      content={'Tooltip content'}
      visible={false}
    >
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-disabled">
          Hover me
        </Button>
      )}
    </Tooltip>
  </Container>
)
