import React from 'react'
import { mount } from 'enzyme'

import { CodeEditor } from '../src/CodeEditor'

const CODE = 'Hello World'

describe('Code', () => {
  it('Renders the default CodeEditor correctly', () => {
    const wrapper = mount(<CodeEditor value={CODE} />)

    // following does not work because of how CodeMirror creates itself (appends to DOM dynamically)
    // expect(wrapper.find('.cm-editor')).toHaveLength(1)
    //
    // there's a problem with enzyme's .find with dynamic DOM appending:
    // https://github.com/enzymejs/enzyme/issues/1233
    //
    // so here's a trick that resolves it:
    const renderedWrapper = wrapper.render()

    expect(renderedWrapper.find('.cm-editor')).toHaveLength(1)
    expect(renderedWrapper.find('.cm-wrap')).toHaveLength(1)

    // .html works as expected; does not need .render
    expect(wrapper.html()).toContain(CODE)
  })
})
