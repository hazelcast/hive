import React from 'react'
import ReactModal from 'react-modal'
import { render, screen } from '@testing-library/react'

import { Dialog, DIALOG_AFFIRMATION_DEFAULT } from '../../src/components/Dialog'

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

    render(
      <Dialog isOpen consequences={dialogConsequences} onClose={onClose} actionChildren={dialogAction} actionOnConfirm={actionOnConfirm} />,
    )

    expect(screen.getByTestId('modal-header-title')).toHaveTextContent(DIALOG_AFFIRMATION_DEFAULT)
    expect(screen.getByTestId('modal-content')).toHaveTextContent(dialogConsequences)
  })

  it('Renders custom affirmation clause', () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    render(
      <Dialog
        isOpen
        affirmation={dialogAffirmation}
        consequences={dialogConsequences}
        onClose={onClose}
        actionChildren={dialogAction}
        actionOnConfirm={actionOnConfirm}
      />,
    )

    expect(screen.getByTestId('modal-header-title')).toHaveTextContent(dialogAffirmation)
    expect(screen.getByTestId('modal-content')).toHaveTextContent(dialogConsequences)
  })

  it("Auto-focuses confirmation action, in case it's not dangerous", () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    render(
      <Dialog
        isOpen
        affirmation={dialogAffirmation}
        consequences={dialogConsequences}
        onClose={onClose}
        actionChildren={dialogAction}
        actionOnConfirm={actionOnConfirm}
      />,
    )

    expect(document.activeElement).toEqual(screen.getByTestId('modal-button-action'))
  })

  it('Auto-focuses Cancel action, in case confirmation action is dangerous', () => {
    const onClose = jest.fn()
    const actionOnConfirm = jest.fn()

    render(
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

    expect(document.activeElement).toEqual(screen.getByTestId('modal-button-cancel'))
  })
})
