import { mount } from 'enzyme'
import ReactModal from 'react-modal'
import React from 'react'
import { Dialog, DIALOG_AFFIRMATION_DEFAULT } from '../src/Dialog'
import { Modal } from '../src/Modal'

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
      <Dialog isOpen consequences={dialogConsequences} onClose={onClose} actionChildren={dialogAction} actionOnConfirm={actionOnConfirm} />,
    )

    expect(wrapper.find(Modal).props()).toMatchObject({
      isOpen: true,
      title: DIALOG_AFFIRMATION_DEFAULT,
      onClose,
      actions: [
        {
          children: dialogAction,
          kind: 'primary',
          onClick: actionOnConfirm,
        },
      ],
    })

    expect(wrapper.findDataTest('modal-header-title').text()).toEqual(DIALOG_AFFIRMATION_DEFAULT)
    expect(wrapper.findDataTest('dialog-consequences').text()).toEqual(dialogConsequences)
  })

  it('Renders custom affirmation clause', () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    const wrapper = mount(
      <Dialog
        isOpen
        affirmation={dialogAffirmation}
        consequences={dialogConsequences}
        onClose={onClose}
        actionChildren={dialogAction}
        actionOnConfirm={actionOnConfirm}
      />,
    )

    expect(wrapper.find(Modal).props()).toMatchObject({
      isOpen: true,
      title: dialogAffirmation,
      onClose,
      actions: [
        {
          children: dialogAction,
          kind: 'primary',
          onClick: actionOnConfirm,
        },
      ],
    })

    expect(wrapper.findDataTest('modal-header-title').text()).toEqual(dialogAffirmation)
    expect(wrapper.findDataTest('dialog-consequences').text()).toEqual(dialogConsequences)
  })

  it("Auto-focuses confirmation action, in case it's not dangerous", () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    const wrapper = mount(
      <Dialog
        isOpen
        affirmation={dialogAffirmation}
        consequences={dialogConsequences}
        onClose={onClose}
        actionChildren={dialogAction}
        actionOnConfirm={actionOnConfirm}
      />,
    )

    expect(wrapper.find(Modal).props()).toMatchObject({
      isOpen: true,
      title: dialogAffirmation,
      onClose,
      actions: [
        {
          children: dialogAction,
          kind: 'primary',
          onClick: actionOnConfirm,
        },
      ],
    })

    expect(wrapper.findDataTest('modal-button-action').at(0).is(':focus')).toBe(true)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).is(':focus')).toBe(false)
  })

  it('Auto-focuses Cancel action, in case confirmation action is dangerous', () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    const wrapper = mount(
      <Dialog
        isOpen
        affirmation={dialogAffirmation}
        consequences={dialogConsequences}
        onClose={onClose}
        actionDangerous
        actionChildren={dialogAction}
        actionOnConfirm={actionOnConfirm}
      />,
    )

    expect(wrapper.find(Modal).props()).toMatchObject({
      isOpen: true,
      title: dialogAffirmation,
      onClose,
      actions: [
        {
          children: dialogAction,
          kind: 'danger',
          onClick: actionOnConfirm,
        },
      ],
    })

    expect(wrapper.findDataTest('modal-button-action').at(0).is(':focus')).toBe(false)
    expect(wrapper.findDataTest('modal-button-cancel').at(0).is(':focus')).toBe(true)
  })
})
