import React from 'react'
import { useUID } from 'react-uid'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { renderHook } from '@testing-library/react'

import {
  getTabId,
  getPanelId,
  useTabContext,
  TabContextValue,
  tabContextDefaultValue,
  TabContextProviderControlled,
  TabContextProviderControlledProps,
} from '../../src/Tabs/TabContext'

jest.mock('react-uid')
const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>
const testId = 'testId'

describe('TabContext', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => testId)
  })

  describe('Helper ID generation functions', () => {
    describe('getTabId', () => {
      it('returns ID with correct prefix and value', () => {
        const expectedTabId = 'testPrefix-tab-testValue'

        expect(getTabId('testPrefix', 'testValue')).toBe(expectedTabId)
      })
    })

    describe('getPanelId', () => {
      it('returns ID with correct prefix and value', () => {
        const expectedPanelId = 'testPrefix-panel-testValue'

        expect(getPanelId('testPrefix', 'testValue')).toBe(expectedPanelId)
      })
    })
  })

  describe('useTabContext', () => {
    it('returns default values', () => {
      const { result } = renderHook(useTabContext)

      expect(result.current).toBe<TabContextValue>(tabContextDefaultValue)
    })
  })

  describe('TabContextProviderControlled', () => {
    it('provides context values', async () => {
      const contextValues = {
        value: 2,
        onChange: jest.fn(),
        children: 'testChildren',
      }

      const ConsumerComponent = ({
        expectedValues: { value, idPrefix },
      }: {
        expectedValues: TabContextProviderControlledProps & { idPrefix: string }
      }) => {
        const values = useTabContext()

        expect(values).toEqual<TabContextValue>({
          onChange: expect.anything(),
          value,
          idPrefix,
        })

        return null
      }

      await renderAndCheckA11Y(
        <TabContextProviderControlled {...contextValues}>
          <ConsumerComponent expectedValues={{ ...contextValues, idPrefix: testId }} />
        </TabContextProviderControlled>,
      )
    })
  })
})
