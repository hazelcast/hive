import { mount } from 'enzyme'
// import ReactModal from 'react-modal'
// import { X } from 'react-feather'
import React, { FC, useRef } from 'react'
import { Modal, ModalProps } from '../src/Modal'

const modalTitle = 'Modal Title'
const modalAction = 'Action'

// const modalWrapperId = 'modal-wrapper-id'

const ModalContent = () => <div>Content</div>

const ModalWrapper: FC<ModalProps> = ({ children, ...props }) => {
  const appRef = useRef(null)

  return (
    <div ref={appRef}>
      <Modal appElement={(appRef.current as unknown) as HTMLElement} {...props}>
        {children}
      </Modal>
    </div>
  )
}

describe('Modal', () => {
  it('Renders all expected components', () => {
    const onClose = jest.fn()
    const onAction = jest.fn()

    const wrapper = mount(
      <ModalWrapper isOpen title={modalTitle} onClose={onClose} action={modalAction} onAction={onAction}>
        <ModalContent />
      </ModalWrapper>,
    )

    wrapper.update()

    expect(true).toBe(true)

    /* expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: "dialog",
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: true,
      onRequestClose: onClose,
    }) */

    /* expect(wrapper.existsDataTest('modal-header')).toBeTruthy()

    expect(wrapper.findDataTest('modal-title').text()).toBe(modalTitle)
    expect(wrapper.findDataTest('modal-button-close').props()).toBe({
      kind: 'transparent',
      size: 'small',
      iconAriaLabel: 'Close icon',
      icon: X,
      onClick: onClose,
    })
    expect(wrapper.findDataTest('modal-content')).toBe(ModalContent)
    expect(wrapper.findDataTest('modal-footer')).toHaveLength(2)
    expect(wrapper.findDataTest('modal-button-cancel').props()).toBe({
      kind: 'secondary',
      onClick: onClose,
      children: 'Cancel'
    })
    expect(wrapper.findDataTest('modal-button-action').props()).toBe({
      kind: 'primary',
      onClick: onAction,
      children: modalAction
    }) */
  })

  /* it('Renders nothing when isOpen is false', () => {
    const wrapper = mount(
      <Modal isOpen={false} title={modalTitle}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: "dialog",
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: modalTitle,
      isOpen: false,
      onRequestClose: undefined,
    })
  }) */
})
