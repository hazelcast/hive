import { mount } from 'enzyme'
import ReactModal from 'react-modal'
import React from 'react'
import { Dialog, DIALOG_AFFIRMATION_DEFAULT } from '../src/Dialog'

const dialogTitle = 'Dialog Title'
const dialogAction = 'Action'
const dialogAffirmation = 'Dialog affirmation'
const dialogConsequences = 'Dialog consequences'

const dialogContent = 'Content'

describe('Dialog', () => {
  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  it('Renders Modal with correct props and content', () => {
    const onClose = jest.fn()
    const onAction = jest.fn()

    const wrapper = mount(
      <Dialog isOpen title={dialogTitle} onClose={onClose} actionLabel={dialogAction} onAction={onAction}>
        {dialogContent}
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

    expect(wrapper.findDataTest('dialog-affirmation').text()).toEqual(DIALOG_AFFIRMATION_DEFAULT)
    expect(wrapper.findDataTest('dialog-consequences').exists()).toBeFalsy()
    expect(wrapper.findDataTest('dialog-children').text()).toBe(dialogContent)
  })

  it('Renders custom affirmation clause', () => {
    const onClose = jest.fn()
    const onAction = jest.fn()

    const wrapper = mount(
      <Dialog isOpen title={dialogTitle} onClose={onClose} actionLabel={dialogAction} onAction={onAction} affirmation={dialogAffirmation}>
        {dialogContent}
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

    expect(wrapper.findDataTest('dialog-affirmation').text()).toEqual(dialogAffirmation)
    expect(wrapper.findDataTest('dialog-consequences').exists()).toBeFalsy()
    expect(wrapper.findDataTest('dialog-children').text()).toBe(dialogContent)
  })

  it('Renders consequences clause', () => {
    const onClose = jest.fn()
    const onAction = jest.fn()

    const wrapper = mount(
      <Dialog
        isOpen
        title={dialogTitle}
        onClose={onClose}
        actionLabel={dialogAction}
        onAction={onAction}
        affirmation={dialogAffirmation}
        consequences={dialogConsequences}
      >
        {dialogContent}
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

    expect(wrapper.findDataTest('dialog-affirmation').text()).toEqual(dialogAffirmation)
    expect(wrapper.findDataTest('dialog-consequences').text()).toEqual(dialogConsequences)
    expect(wrapper.findDataTest('dialog-children').text()).toBe(dialogContent)
  })
})
