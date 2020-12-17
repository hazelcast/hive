import { mount } from 'enzyme'
import ReactModal from 'react-modal'
import { X } from 'react-feather'
import React from 'react'
import { Modal } from '../src/Modal'
import { act } from 'react-dom/test-utils'

const modalTitle = 'Modal Title'
const modalAction = 'Action'

const ModalContent = () => <div>Content</div>

describe('Modal', () => {
  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  it('Renders all expected components', () => {
    const onClose = jest.fn()
    const onAction = jest.fn()

    const wrapper = mount(
      <Modal isOpen title={modalTitle} onClose={onClose} actionLabel={modalAction} onAction={onAction}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.existsDataTest('modal-header')).toBeTruthy()

    expect(wrapper.findDataTest('modal-title').text()).toBe(modalTitle)
    expect(wrapper.findDataTest('modal-button-close').at(0).props()).toStrictEqual({
      kind: 'transparent',
      size: 'small',
      ariaLabel: 'Close icon',
      icon: X,
      onClick: onClose,
      'data-test': 'modal-button-close',
    })

    expect(wrapper.findDataTest('modal-content').find(ModalContent).exists()).toBeTruthy()

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(2)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).props()).toStrictEqual({
      kind: 'secondary',
      onClick: onClose,
      children: 'Cancel',
      'data-test': 'modal-button-cancel',
    })
    expect(wrapper.findDataTest('modal-button-action').at(0).props()).toStrictEqual({
      onClick: onAction,
      children: modalAction,
      'data-test': 'modal-button-action',
    })
  })

  it('Does not render anything when isOpen is false', () => {
    const wrapper = mount(
      <Modal isOpen={false} title={modalTitle}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: false,
      onRequestClose: undefined,
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

  it('Can be closed via bottom Cancel button', () => {
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
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })
  })

  it('Renders footer with Cancel button onClose it passed', () => {
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
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(1)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).props()).toStrictEqual({
      kind: 'secondary',
      onClick: onClose,
      children: 'Cancel',
      'data-test': 'modal-button-cancel',
    })
  })

  it('Does not render footer when neither onAction not onClose are passed', () => {
    const wrapper = mount(
      <Modal isOpen title={modalTitle}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: undefined,
    })

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(0)
  })

  it('Renders footer with Action button onAction (and action) it passed', () => {
    const onAction = jest.fn()

    const wrapper = mount(
      <Modal isOpen title={modalTitle} onAction={onAction} actionLabel={modalAction}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: undefined,
    })

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(1)
    expect(wrapper.findDataTest('modal-button-action').at(0).props()).toStrictEqual({
      onClick: onAction,
      children: modalAction,
      'data-test': 'modal-button-action',
    })
  })

  it('Renders footer with both Action and Cancel buttons when onClose and onAction are passed', () => {
    const onClose = jest.fn()
    const onAction = jest.fn()

    const wrapper = mount(
      <Modal isOpen title={modalTitle} onAction={onAction} actionLabel={modalAction} onClose={onClose}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    })

    expect(wrapper.findDataTest('modal-footer').children()).toHaveLength(2)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).props()).toStrictEqual({
      kind: 'secondary',
      onClick: onClose,
      children: 'Cancel',
      'data-test': 'modal-button-cancel',
    })
    expect(wrapper.findDataTest('modal-button-action').at(0).props()).toStrictEqual({
      onClick: onAction,
      children: modalAction,
      'data-test': 'modal-button-action',
    })
  })
})
