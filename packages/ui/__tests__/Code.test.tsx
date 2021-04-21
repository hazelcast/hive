import React from 'react'
import { mount } from 'enzyme'

import { Code } from '../src/Code'

describe('Code', () => {
  it('Renders the default Code correctly', () => {
    const wrapper = mount(<Code value="Hello World" />)

    // following does not work because of how CodeMirror creates itself
    // expect(wrapper.find('.cm-editor')).toHaveLength(1)

    // so we just check the html contents.
    expect(wrapper.html()).toContain('cm-editor')
    expect(wrapper.html()).toContain('cm-wrap')
  })
})
