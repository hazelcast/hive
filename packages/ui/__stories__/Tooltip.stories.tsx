import React from 'react'
import { Button } from '../src/Button'

import { Tooltip } from '../src/Tooltip'

import utilStyles from './utils.scss'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
}

export const Default = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-default" content={'Tooltip content'}>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-default">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/kaC3jgqMSgqMEgnv7TIse1/%F0%9F%93%90Sign-in-flow?node-id=118%3A2349',
  },
}

export const AutoPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-auto" placement="auto" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-auto">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const AutoStartPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-auto-start" placement="auto-start" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-auto-start">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const AutoEndPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-auto-end" placement="auto-end" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-auto-end">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const TopPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-top" placement="top" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-top">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const TopStartPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-top-start" placement="top-start" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-top-start">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const TopEndPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-top-end" placement="top-end" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-top-end">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const RightPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-right" placement="right" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-right">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const RightStartPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-right-start" placement="right-start" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-right-start">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const RightEndPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-right-end" placement="right-end" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-right-start">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const BottomPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-bottom" placement="bottom" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-bottom">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const BottomStartPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-bottom-start" placement="bottom-start" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-bottom-start">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const BottomEndPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-bottom-end" placement="bottom-end" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-bottom-end">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const LeftPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-left" placement="left" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-left">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const LeftStartPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-left-start" placement="left-start" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-left-start">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const LeftEndPlacement = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-placement-left-end" placement="left-end" content={'Tooltip content'} visible>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-placement-left-end">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const InteractiveContent = () => (
  <div className={utilStyles.wrapperCentered} style={{ minHeight: '250px' }}>
    <Tooltip
      id="tooltip-interactive-content"
      content={
        <>
          <p>
            Parley come about mutiny swing the lead to go on account run a shot across the bow schooner fathom bounty carouser. Maroon
            killick keel driver scourge of the seven seas Jolly Roger hands spyglass Brethren of the Coast booty. Boom rigging gally Plate
            Fleet pink dance the hempen jig bilge water measured fer yer chains take a caulk tender.
          </p>

          <Button>Aye Captain!</Button>
        </>
      }
      visible
    >
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-interactive-content">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)

export const VisibleFalse = () => (
  <div className={utilStyles.wrapperCentered}>
    <Tooltip id="tooltip-disabled" content={'Tooltip content'} visible={false}>
      {(ref) => (
        <Button ref={ref} aria-labelledby="tooltip-disabled">
          Hover me
        </Button>
      )}
    </Tooltip>
  </div>
)
