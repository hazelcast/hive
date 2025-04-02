import { render, screen, within } from '@testing-library/react'
import ReactModal from 'react-modal'
import { CloudLightning } from 'react-feather'
import React from 'react'
import userEvent from '@testing-library/user-event'

import { Modal } from '../../src/components/Modal'

import styles from '../../src/components/Modal.module.scss'

const modalTitle = 'Modal Title'
const ModalContent = () => <div>Content</div>
const children = 'Action'

describe('Modal', () => {
  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  it('Renders all expected components', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()

    render(
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

    expect(screen.queryByRole('dialog', { hidden: true })).toBeInTheDocument()
    expect(screen.queryByText(modalTitle)).toBeInTheDocument()
    expect(screen.queryByLabelText('Close icon')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-content')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-footer')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-button-cancel')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-button-action')).toBeInTheDocument()
  })

  it('Renders header icon', () => {
    const onClose = jest.fn()
    const icon = CloudLightning
    const iconAriaLabel = 'Icon Cloud'

    render(
      <Modal isOpen onClose={onClose} title={modalTitle} icon={icon} iconAriaLabel={iconAriaLabel}>
        <ModalContent />
      </Modal>,
    )

    expect(within(screen.getByTestId('modal-header')).queryByLabelText(iconAriaLabel)).toBeInTheDocument()
  })

  it('Does not render anything when isOpen is false', () => {
    const onClose = jest.fn()

    render(
      <Modal isOpen={false} onClose={onClose} title={modalTitle}>
        <ModalContent />
      </Modal>,
    )

    expect(screen.queryByRole('dialog', { hidden: true })).not.toBeInTheDocument()
    expect(screen.queryByText(modalTitle)).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Close icon')).not.toBeInTheDocument()
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument()
    expect(screen.queryByTestId('modal-footer')).not.toBeInTheDocument()
    expect(screen.queryByTestId('modal-button-cancel')).not.toBeInTheDocument()
    expect(screen.queryByTestId('modal-button-action')).not.toBeInTheDocument()
  })

  it('Can be closed via top-right close button', async () => {
    const onClose = jest.fn()

    render(
      <Modal isOpen title={modalTitle} onClose={onClose}>
        <ModalContent />
      </Modal>,
    )

    expect(screen.queryByLabelText('Close icon')).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(0)

    await userEvent.click(screen.getByLabelText('Close icon'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Can be closed via footer Cancel button', async () => {
    const onClose = jest.fn()

    render(
      <Modal isOpen title={modalTitle} onClose={onClose}>
        <ModalContent />
      </Modal>,
    )

    expect(screen.queryByTestId('modal-button-cancel')).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(0)

    await userEvent.click(screen.getByTestId('modal-button-cancel'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Sets shouldCloseOnEsc and shouldCloseOnOverlayClick to false, when closable is false', async () => {
    const onClose = jest.fn()

    render(
      <Modal isOpen title={modalTitle} onClose={onClose} closable={false}>
        <ModalContent />
      </Modal>,
    )

    expect(onClose).toHaveBeenCalledTimes(0)
    expect(document.body.querySelector(`.${styles.overlay}`)).toBeInTheDocument()

    await userEvent.click(document.body.querySelector(`.${styles.overlay}`)!)

    expect(onClose).toHaveBeenCalledTimes(0)
  })

  it('Renders footer with only Cancel button, which is defensively auto-focused by default.', () => {
    const onClose = jest.fn()

    render(
      <Modal isOpen title={modalTitle} onClose={onClose}>
        <ModalContent />
      </Modal>,
    )

    expect(screen.queryByTestId('modal-footer')).toBeInTheDocument()
    expect(document.activeElement).toEqual(screen.queryByTestId('modal-button-cancel'))
  })

  it('Renders footer with Action and Cancel buttons when actions are passed', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()

    render(
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

    expect(screen.queryByTestId('modal-footer')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-button-cancel')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-button-action')).toBeInTheDocument()
  })

  it('Hides footer with Actions', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()

    render(
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

    expect(screen.queryByTestId('modal-footer')).not.toBeInTheDocument()
  })

  it('When "autoFocus" is passed to an action, the action is focused. This disables autoFocus on Cancel button.', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()

    render(
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

    expect(screen.getByTestId('modal-footer').children).toHaveLength(2)
    expect(document.activeElement).toEqual(screen.getByTestId('modal-button-action'))
  })

  it('Modal child element can be auto-focused when modal "autoFocus" is false', () => {
    const onClose = jest.fn()
    const onClick = jest.fn()
    const modalChildren = <input data-test="test-input" type="text" autoFocus />

    render(
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

    expect(screen.getByTestId('modal-footer').children).toHaveLength(2)
    expect(document.activeElement).toEqual(screen.getByTestId('test-input'))
  })
})
