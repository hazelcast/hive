import React from 'react'
import { X } from 'react-feather'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { Loader, Tooltip, IconButton, IconButtonKind, Icon } from '../src'

import styles from '../src/IconButton.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const ariaLabel = 'X Icon'
const id = 'luke'

describe('IconButton', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => id)
  })

  const buttonKindTestData: [IconButtonKind, string][] = [
    ['primary', styles.primary],
    ['transparent', styles.transparent],
  ]

  it.each(buttonKindTestData)('Renders Button with correct className which corresponds to button kind', async (kind, className) => {
    const wrapper = await mountAndCheckA11Y(<IconButton kind={kind} icon={X} ariaLabel={ariaLabel} />)

    expect(wrapper.find('button').prop('className')).toBe(cn(styles.iconButton, className))
  })

  it('Renders button with proper aria-label', async () => {
    const wrapper = await mountAndCheckA11Y(<IconButton kind="primary" icon={X} ariaLabel={ariaLabel} />)

    expect(wrapper.find('button').prop('aria-label')).toBe(ariaLabel)

    expect(wrapper.find(Icon).props()).toEqual({
      icon: X,
      size: undefined,
      ariaHidden: true,
    })
  })

  it('Renders icon with proper size and iconClassName', async () => {
    const wrapper = await mountAndCheckA11Y(<IconButton kind="primary" icon={X} ariaLabel={ariaLabel} size="xlarge" iconClassName="yoda" />)

    expect(wrapper.find(Icon).props()).toEqual({
      icon: X,
      size: 'xlarge',
      ariaHidden: true,
      className: 'yoda',
    })
  })

  it('Renders loading button', async () => {
    const wrapper = await mountAndCheckA11Y(<IconButton kind="primary" icon={X} ariaLabel={ariaLabel} loading />)

    expect(wrapper.find('button').prop('disabled')).toBe(true)
    expect(wrapper.find(Tooltip).at(0).props()).toMatchObject({
      content: undefined,
    })
    expect(wrapper.exists(Loader)).toBeTruthy()
    expect(wrapper.exists(Icon)).toBeFalsy()
  })

  it('Renders disabled button with a disabled tooltip', async () => {
    const disabledTooltip = 'Disabled tooltip'

    const wrapper = await mountAndCheckA11Y(
      <IconButton kind="primary" icon={X} ariaLabel={ariaLabel} disabled disabledTooltip={disabledTooltip} />,
    )

    expect(wrapper.find('button').prop('disabled')).toBe(true)
    expect(wrapper.find(Tooltip).at(0).props()).toMatchObject({
      content: disabledTooltip,
    })
    expect(wrapper.exists(Loader)).toBeFalsy()
    expect(wrapper.exists(Icon)).toBeTruthy()
  })

  it('Renders disabled loading button with a disabled tooltip', async () => {
    const disabledTooltip = 'Disabled tooltip'

    const wrapper = await mountAndCheckA11Y(
      <IconButton kind="primary" icon={X} ariaLabel={ariaLabel} disabled disabledTooltip={disabledTooltip} loading />,
    )

    expect(wrapper.find('button').prop('disabled')).toBe(true)
    expect(wrapper.find(Tooltip).at(0).props()).toMatchObject({
      content: disabledTooltip,
    })
    expect(wrapper.exists(Loader)).toBeTruthy()
    expect(wrapper.exists(Icon)).toBeFalsy()
  })

  it('Renders disabled loading button with a disabled tooltip and combined aria-labelledby', async () => {
    const disabledTooltip = 'Disabled tooltip'
    const ariaLabelledBy = 'darth'

    const wrapper = await mountAndCheckA11Y(
      <IconButton kind="primary" icon={X} ariaLabelledBy={ariaLabelledBy} disabled disabledTooltip={disabledTooltip} />,
    )

    expect(wrapper.find('button').prop('aria-labelledby')).toBe(`${ariaLabelledBy} ${id}`)
  })

  it('Renders button with a link semantics', async () => {
    const onClick = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <IconButton
        kind="primary"
        component="a"
        href="#"
        icon={X}
        ariaLabel={ariaLabel}
        onClick={onClick}
        rel={['noopener', 'noreferrer']}
        target="_blank"
      />,
    )

    expect(wrapper.find('button').exists()).toBe(false)

    expect(wrapper.find('a').props()).toMatchObject({
      href: '#',
      onClick,
      rel: 'noopener noreferrer',
      target: '_blank',
      type: undefined,
      'aria-label': ariaLabel,
    })
  })

  it('Renders with a tooltip', async () => {
    const tooltip = 'Tooltip'

    const wrapper = await mountAndCheckA11Y(
      <IconButton kind="primary" icon={X} ariaLabel={ariaLabel} tooltip={tooltip} tooltipPlacement="bottom" />,
    )

    expect(wrapper.find(Tooltip).at(0).props()).toMatchObject({
      content: tooltip,
      placement: 'bottom',
    })
  })
})
