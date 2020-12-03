import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { Modal } from '../src/Modal'

const modalDataTest = 'modal'
const modalTitle = 'Modal Title'

const ModalContent = () => <div>Content</div>

describe('Modal', () => {
  it('Renders nothing when isOpen is false', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Modal data-test={modalDataTest} isOpen={false} title={modalTitle}>
        <ModalContent />
      </Modal>,
    )

    expect(wrapper.findDataTest(modalDataTest).props()).toBe(null)
  })
})
