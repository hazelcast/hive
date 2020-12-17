import { mount } from 'enzyme'
import ReactModal from 'react-modal'
import React from 'react'
import { Dialog } from '../src/Dialog'

const dialogTitle = 'Dialog Title'
const dialogAction = 'Action'

const DialogContent = () => <div>Content</div>

describe('Dialog', () => {
  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  it('Renders all expected components', () => {
    const onClose = jest.fn()
    const onAction = jest.fn()

    const wrapper = mount(
      <Dialog isOpen title={dialogTitle} onClose={onClose} actionLabel={dialogAction} onAction={onAction}>
        <DialogContent />
      </Dialog>,
    )

    expect(wrapper.find(ReactModal).props()).toMatchObject({
      ariaHideApp: true,
      preventScroll: false,
      role: 'dialog',
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldFocusAfterRender: true,
      shouldReturnFocusAfterClose: true,
      contentLabel: dialogTitle,
      isOpen: true,
      onRequestClose: onClose,
    })
  })
})
