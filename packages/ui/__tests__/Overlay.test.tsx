import React from 'react'
import { mount } from 'enzyme'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import { Settings, X } from 'react-feather'
import { act } from 'react-dom/test-utils'
import cn from 'classnames'

import { Icon, Link, Overlay } from '../src'

import styles from './Overlay.module.scss'
import { DataTestProp } from '@hazelcast/helpers'
import { IconProps } from '../src/Icon'
import { LinkProps } from '../src/Link'

const title = 'Modal Title'
const icon = Settings
const content = <div>Content</div>
const onClose = jest.fn()

describe('Overlay', () => {
  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  it('Renders all expected components', () => {
    const wrapper = mount(
      <Overlay isOpen onClose={onClose} title={title} icon={icon}>
        {content}
      </Overlay>,
    )

    const reactModal = wrapper.find(ReactModal)
    const overlayWrapper = reactModal.findDataTest('overlay-wrapper')
    const header = overlayWrapper.findDataTest('overlay-header')
    const headerIcon = header.findDataTest('overlay-header-icon')
    const headerTitle = header.findDataTest('overlay-header-title')
    const headerCancelButton = header.findDataTest('overlay-header-cancel-button')
    const overlayContent = overlayWrapper.findDataTest('overlay-content')

    expect(reactModal.props()).toMatchObject<ReactModalProps>({
      portalClassName: styles.portal,
      className: styles.modal,
      contentLabel: title,
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      onRequestClose: onClose,
      shouldCloseOnOverlayClick: false,
      shouldCloseOnEsc: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      isOpen: true,
    })
    expect(overlayWrapper.props()).toEqual({
      'data-test': 'overlay-wrapper',
      className: cn(styles.wrapper, styles.normal),
      children: expect.anything(),
    })
    expect(header.props()).toEqual({
      'data-test': 'overlay-header',
      className: styles.header,

      children: expect.anything(),
    })
    expect(headerIcon.type()).toEqual(Icon)
    expect(headerIcon.props()).toEqual<IconProps & DataTestProp>({
      'data-test': 'overlay-header-icon',
      className: styles.icon,
      size: 'medium',
      icon,
      ariaHidden: true,
    })
    expect(headerTitle.type()).toEqual('h1')
    expect(headerTitle.props()).toEqual({
      'data-test': 'overlay-header-title',
      className: styles.title,
      children: title,
    })
    expect(headerCancelButton.type()).toEqual(Link)
    expect(headerCancelButton.props()).toEqual<LinkProps & DataTestProp>({
      'data-test': 'overlay-header-cancel-button',
      className: styles.close,
      component: 'button',
      onClick: onClose,
      size: 'small',
      iconClassName: styles.closeIcon,
      icon: X,
      ariaLabel: 'Cancel',

      children: expect.anything(),
    })
    expect(overlayContent.props()).toEqual({
      'data-test': 'overlay-content',
      className: styles.content,
      children: content,
    })
  })

  it('Renders fullscreen wrapper', () => {
    const wrapper = mount(
      <Overlay isOpen onClose={onClose} title={title} icon={icon} contentWidth="fullscreen">
        {content}
      </Overlay>,
    )

    const reactModal = wrapper.find(ReactModal)
    const overlayWrapper = reactModal.findDataTest('overlay-wrapper')

    expect(overlayWrapper.props()).toEqual({
      'data-test': 'overlay-wrapper',
      className: cn(styles.wrapper, styles.fullscreen),

      children: expect.anything(),
    })
  })

  it('Does not render anything when isOpen is false', () => {
    const wrapper = mount(
      <Overlay isOpen={false} onClose={onClose} title={title} icon={icon}>
        {content}
      </Overlay>,
    )

    const reactModal = wrapper.find(ReactModal)

    expect(reactModal.props()).toMatchObject({
      portalClassName: styles.portal,
      className: styles.modal,
      contentLabel: title,
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      onRequestClose: onClose,
      shouldCloseOnOverlayClick: false,
      shouldCloseOnEsc: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      isOpen: false,
    })

    expect(reactModal.findDataTest('overlay-wrapper').exists()).toBe(false)
  })

  it('Can be closed via top-right cancel button', () => {
    const wrapper = mount(
      <Overlay isOpen onClose={onClose} title={title} icon={icon}>
        {content}
      </Overlay>,
    )

    const closeButton = wrapper.findDataTest('overlay-header-cancel-button')

    expect(closeButton.exists()).toBe(true)
    expect(onClose).toHaveBeenCalledTimes(0)

    act(() => {
      closeButton.simulate('click')
    })
    wrapper.update()

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
