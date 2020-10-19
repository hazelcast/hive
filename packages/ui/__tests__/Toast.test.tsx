import { mount } from 'enzyme'
import React from 'react'
import { AlertTriangle, CheckCircle, Info, Icon } from 'react-feather'
import { AlertType } from '../src/Alert'
import { Toast } from '../src/Toast'

const content = 'Toast Content'

describe('Toast', () => {
  const toastBasicTestData: [AlertType, Icon][] = [
    ['success', CheckCircle],
    ['info', Info],
    ['warning', AlertTriangle],
    ['critical', Info],
  ]

  it.each(toastBasicTestData)('Renders %s Toast with correct icon and content', (type, Icon) => {
    const wrapper = mount(<Toast type={type} content={content} />)

    const AlertElement = wrapper.find(Toast)

    expect(AlertElement.exists()).toBeTruthy()
    expect(AlertElement.findDataTest('toast-content').text()).toBe(content)

    expect(wrapper.find(Icon).exists()).toBeTruthy()
  })
})
