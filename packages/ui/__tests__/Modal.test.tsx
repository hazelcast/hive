import { mount } from 'enzyme'
import ReactModal from 'react-modal'
import { CloudLightning, X } from 'react-feather'
import React from 'react'
import { Modal } from '../src/Modal'
import { act } from 'react-dom/test-utils'

const modalTitle = 'Modal Title'
const modalAction = 'Action'
const ModalContent = () => <div>Content</div>
const children = 'Action'

describe('Modal', () => {
  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  it('Renders all expected components', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()

    const wrapper = mount(
      <Modal
        isOpen
        title={modalTitle}
        onClose={onClose}
        actions={[
          {
            children,
            onClick,
          },
        ]}
      >
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTest('modal-header-title').text()).toBe(modalTitle)
    expect(wrapper.findDataTest('modal-button-close').at(0).props()).toStrictEqual({
      kind: 'transparent',
      ariaLabel: 'Close icon',
      icon: X,
      onClick: onClose,
      'data-test': 'modal-button-close',
    })

    expect(wrapper.findDataTest('modal-content').find(ModalContent).exists()).toBeTruthy()

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(2)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).props()).toStrictEqual({
      variant: 'outlined',
      onClick: onClose,
      children: 'Cancel',
      'data-test': 'modal-button-cancel',
      autoFocus: true,
    })
    expect(wrapper.findDataTest('modal-button-action').at(0).props()).toStrictEqual({
      onClick: onClick,
      children: modalAction,
      'data-test': 'modal-button-action',
    })
  })

  it('Renders header icon', () => {
    const onClose = jest.fn()
    const icon = CloudLightning
    const iconAriaLabel = 'Icon Cloud'

    const wrapper = mount(
      <Modal isOpen onClose={onClose} title={modalTitle} icon={icon} iconAriaLabel={iconAriaLabel}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTestFirst('modal-header-icon').props()).toMatchObject({
      icon: CloudLightning,
      ariaLabel: iconAriaLabel,
    })
    expect(wrapper.findDataTest('modal-header-title').text()).toBe(modalTitle)
    expect(wrapper.findDataTest('modal-button-close').at(0).props()).toStrictEqual({
      kind: 'transparent',
      ariaLabel: 'Close icon',
      icon: X,
      onClick: onClose,
      'data-test': 'modal-button-close',
    })

    expect(wrapper.findDataTest('modal-content').find(ModalContent).exists()).toBeTruthy()
  })

  it('Does not render anything when isOpen is false', () => {
    const onClose = jest.fn()

    const wrapper = mount(
      <Modal isOpen={false} onClose={onClose} title={modalTitle}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: false,
      onRequestClose: onClose,
    })
    expect(wrapper.find('modal-content').exists()).toBeFalsy()
  })

  it('Can be closed via top-right close button', () => {
    const onClose = jest.fn()

    const wrapper = mount(
      <Modal isOpen title={modalTitle} onClose={onClose}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.findDataTest('modal-button-close').exists()).toBeTruthy()
    expect(onClose).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper.findDataTest('modal-button-close').at(1).simulate('click')
    })
    wrapper.update()

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Can be closed via footer Cancel button', () => {
    const onClose = jest.fn()

    const wrapper = mount(
      <Modal isOpen title={modalTitle} onClose={onClose}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.findDataTest('modal-button-cancel').exists()).toBeTruthy()
    expect(onClose).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper.findDataTest('modal-button-cancel').at(1).simulate('click')
    })
    wrapper.update()

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Sets shouldCloseOnEsc and shouldCloseOnOverlayClick to false, when closable is false', () => {
    const onClose = jest.fn()

    const wrapper = mount(
      <Modal isOpen title={modalTitle} onClose={onClose} closable={false}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: false,
      shouldCloseOnOverlayClick: false,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })
  })

  it('Renders footer with only Cancel button, which is defensively auto-focused by default.', () => {
    const onClose = jest.fn()

    const wrapper = mount(
      <Modal isOpen title={modalTitle} onClose={onClose}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(1)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).props()).toStrictEqual({
      variant: 'outlined',
      onClick: onClose,
      children: 'Cancel',
      'data-test': 'modal-button-cancel',
      autoFocus: true,
    })
    expect(wrapper.findDataTest('modal-button-cancel').at(0).is(':focus')).toBe(true)
  })

  it('Renders footer with Action and Cancel buttons when actions are passed', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()

    const wrapper = mount(
      <Modal
        isOpen
        title={modalTitle}
        actions={[
          {
            children,
            onClick,
          },
        ]}
        onClose={onClose}
      >
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(2)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).props()).toStrictEqual({
      variant: 'outlined',
      onClick: onClose,
      children: 'Cancel',
      'data-test': 'modal-button-cancel',
      autoFocus: true,
    })
    expect(wrapper.findDataTest('modal-button-cancel').at(0).is(':focus')).toBe(true)
    expect(wrapper.findDataTest('modal-button-action').at(0).props()).toStrictEqual({
      onClick: onClick,
      children: modalAction,
      'data-test': 'modal-button-action',
    })
  })

  it('Hides footer with Actions', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()

    const wrapper = mount(
      <Modal
        isOpen
        title={modalTitle}
        actions={[
          {
            children,
            onClick,
          },
        ]}
        onClose={onClose}
        hideActions
      >
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTest('modal-footer').exists()).toBe(false)
  })

  it('When "autoFocus" is passed to an action, the action is focused. This disables autoFocus on Cancel button.', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()

    const wrapper = mount(
      <Modal
        isOpen
        title={modalTitle}
        actions={[
          {
            children,
            onClick,
            autoFocus: true,
          },
        ]}
        onClose={onClose}
      >
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(2)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).props()).toStrictEqual({
      variant: 'outlined',
      onClick: onClose,
      children: 'Cancel',
      'data-test': 'modal-button-cancel',
      autoFocus: false,
    })
    expect(wrapper.findDataTest('modal-button-cancel').at(0).is(':focus')).toBe(false)
    expect(wrapper.findDataTest('modal-button-action').at(0).props()).toStrictEqual({
      onClick: onClick,
      children: modalAction,
      'data-test': 'modal-button-action',
      autoFocus: true,
    })
    expect(wrapper.findDataTest('modal-button-action').at(0).is(':focus')).toBe(true)
  })

  it('Modal child element can be auto-focused when modal "autoFocus" is false', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()
    const modalChildren = <input data-test="test-input" type="text" autoFocus />

    const wrapper = mount(
      <Modal
        autoFocus={false}
        isOpen
        title={modalTitle}
        onClose={onClose}
        actions={[
          {
            children,
            onClick,
          },
        ]}
      >
        {modalChildren}
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: false,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(2)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).props()).toStrictEqual({
      variant: 'outlined',
      onClick: onClose,
      children: 'Cancel',
      'data-test': 'modal-button-cancel',
      autoFocus: false,
    })
    expect(wrapper.findDataTest('modal-button-cancel').at(0).is(':focus')).toBe(false)
    expect(wrapper.findDataTest('modal-button-action').at(0).props()).toStrictEqual({
      onClick: onClick,
      children: modalAction,
      'data-test': 'modal-button-action',
    })
    expect(wrapper.findDataTest('modal-button-action').at(0).is(':focus')).toBe(false)

    expect(wrapper.findDataTest('test-input').is(':focus')).toBe(true)
  })
})
