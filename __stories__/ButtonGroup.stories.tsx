import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

import { ButtonGroup } from '../src/components/ButtonGroup'
import { Button } from '../src/components/Button'
import { IconButton } from '../src/components/IconButton'

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
}

export const PagerStyle = () => (
  <ButtonGroup ariaLabel="Date navigation">
    <IconButton variant="outlined" ariaLabel="Previous" icon={ChevronLeft} />
    <Button variant="outlined" color="secondary">
      Today
    </Button>
    <IconButton variant="outlined" ariaLabel="Next" icon={ChevronRight} />
  </ButtonGroup>
)

export const ThreeButtons = () => (
  <ButtonGroup ariaLabel="View toggle">
    <Button variant="outlined" color="secondary">
      Day
    </Button>
    <Button variant="outlined" color="secondary">
      Week
    </Button>
    <Button variant="outlined" color="secondary">
      Month
    </Button>
  </ButtonGroup>
)
