import { mount } from 'enzyme'
import ReactModal from 'react-modal'
import React from 'react'
import { Dialog, DIALOG_AFFIRMATION_DEFAULT } from '../src/Dialog'

const dialogTitle = 'Dialog Title'
const dialogAction = 'Action'
const dialogAffirmation = 'Dialog affirmation'
const dialogConsequences = 'Dialog consequences'

describe('Dialog', () => {
  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  it('Renders Modal with correct props and content', () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    const wrapper = mount(
      <Dialog isOpen title={dialogTitle} onClose={onClose} actionChildren={dialogAction} actionOnConfirm={actionOnConfirm} />,
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
  })

  it('Renders custom affirmation clause', () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    const wrapper = mount(
      <Dialog
        isOpen
        title={dialogTitle}
        onClose={onClose}
        actionChildren={dialogAction}
        actionOnConfirm={actionOnConfirm}
        affirmation={dialogAffirmation}
      />,
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
  })

  it('Renders consequences clause', () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    const wrapper = mount(
      <Dialog
        isOpen
        title={dialogTitle}
        onClose={onClose}
        actionChildren={dialogAction}
        actionOnConfirm={actionOnConfirm}
        affirmation={dialogAffirmation}
        consequences={dialogConsequences}
      />,
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
  })
})
