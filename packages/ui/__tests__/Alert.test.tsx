import { mount } from 'enzyme'
import React from 'react'
import { AlertTriangle, CheckCircle, Info, ReactFeatherIcon, X } from 'react-feather'
import { Alert, AlertType, AlertAction, AlertActions } from '../Alert'
import { Button, ButtonStatusKindModifier } from '../Button'

const title = 'Alert Title'
const content = 'Alert Content'
const onClose = jest.fn()

const AlertAction1: AlertAction = {
  text: 'Action 1',
  onClick: onClose,
}

const AlertAction2: AlertAction = {
  text: 'Action 2',
  onClick: onClose,
}

const AlertActions1: AlertActions = [AlertAction1]

const AlertActions2: AlertActions = [AlertAction1, AlertAction2]

describe('Alert', () => {
  const alertBasicTestData: [AlertType, ReactFeatherIcon][] = [
    ['success', CheckCircle],
    ['info', Info],
    ['warning', AlertTriangle],
    ['critical', Info],
  ]

  it.each(alertBasicTestData)('Renders %s Alert with correct icon and title', (type, Icon) => {
    const wrapper = mount(<Alert type={type} title={title} />)

    const AlertElement = wrapper.find(Alert)

    expect(AlertElement.exists()).toBeTruthy()
    expect(AlertElement.findDataTest('alert-title').text()).toBe(title)

    expect(wrapper.find(Icon).exists()).toBeTruthy()

    expect(wrapper.findDataTest('alert-close').exists()).toBeFalsy()
    expect(wrapper.findDataTest('alert-body').exists()).toBeFalsy()
  })

  it('Renders X as "Close" button when "onClose" is passed', () => {
    const wrapper = mount(<Alert type="success" title={title} onClose={onClose} />)

    const AlertElement = wrapper.find(Alert)

    expect(AlertElement.exists()).toBeTruthy()
    expect(AlertElement.findDataTest('alert-title').text()).toBe(title)

    expect(wrapper.findDataTest('alert-close').exists()).toBeTruthy()
    expect(wrapper.findDataTest('alert-close').find(X).exists()).toBeTruthy()

    expect(wrapper.findDataTest('alert-body').exists()).toBeFalsy()
  })

  it('Renders alert body with content, when "content" is passed', () => {
    const wrapper = mount(<Alert type="success" title={title} content={content} />)

    const AlertElement = wrapper.find(Alert)

    expect(AlertElement.exists()).toBeTruthy()
    expect(AlertElement.findDataTest('alert-title').text()).toBe(title)

    expect(wrapper.findDataTest('alert-close').exists()).toBeFalsy()

    expect(wrapper.findDataTest('alert-body').exists()).toBeTruthy()
    expect(wrapper.findDataTest('alert-content').exists()).toBeTruthy()
    expect(wrapper.findDataTest('alert-content').text()).toBe(content)
    expect(wrapper.findDataTest('alert-actions').exists()).toBeFalsy()
  })

  const alertActionsTestData: [string, string, AlertActions, ButtonStatusKindModifier[]][] = [
    ['primary', '1 action is', AlertActions1, ['primary']],
    ['primary and secondary', '2 actions are', AlertActions2, ['primary', 'secondary']],
  ]

  it.each(alertActionsTestData)('Renders alert body with %s action button, when %s passed', (_, __, Actions, statusKindModifiers) => {
    const wrapper = mount(<Alert type="success" title={title} actions={Actions} />)

    const AlertElement = wrapper.find(Alert)

    expect(AlertElement.exists()).toBeTruthy()
    expect(AlertElement.findDataTest('alert-title').text()).toBe(title)

    expect(wrapper.findDataTest('alert-close').exists()).toBeFalsy()

    expect(wrapper.findDataTest('alert-body').exists()).toBeTruthy()
    expect(wrapper.findDataTest('alert-content').exists()).toBeFalsy()

    expect(wrapper.findDataTest('alert-actions').exists()).toBeTruthy()
    expect(wrapper.findDataTest('alert-actions').children()).toHaveLength(Actions.length)

    wrapper
      .findDataTest('alert-action')
      .find(Button)
      .forEach((action, aI) => {
        expect(action.prop('statusKindModifier')).toBe(statusKindModifiers[aI])
        expect(action.text()).toBe(Actions[aI].text)
      })
  })

  it('Renders alert body with content and buttons, when "content" and "actions" is passed', () => {
    const wrapper = mount(<Alert type="success" title={title} content={content} actions={AlertActions1} />)

    const AlertElement = wrapper.find(Alert)

    expect(AlertElement.exists()).toBeTruthy()
    expect(AlertElement.findDataTest('alert-title').text()).toBe(title)

    expect(wrapper.findDataTest('alert-close').exists()).toBeFalsy()

    expect(wrapper.findDataTest('alert-body').exists()).toBeTruthy()
    expect(wrapper.findDataTest('alert-content').exists()).toBeTruthy()
    expect(wrapper.findDataTest('alert-actions').exists()).toBeTruthy()
  })
})
