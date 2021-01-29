import React from 'react'
import { useUID } from 'react-uid'
import { getHookRes, testHook } from '@hazelcast/test-helpers/src/hooks'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import {
  getTabId,
  getPanelId,
  useTabContext,
  TabContextProvider,
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
      const { spyHookRes } = testHook(useTabContext)

      expect(getHookRes(spyHookRes)).toBe<TabContextValue>(tabContextDefaultValue)
    })
  })

  describe('Provider components', () => {
    describe('TabContextProvider', () => {
      it('renders TabContextProviderControlled', async () => {
        const children = 'testChildren'

        const wrapper = await mountAndCheckA11Y(<TabContextProvider>{children}</TabContextProvider>)

        expect(wrapper.find(TabContextProviderControlled).props()).toEqual<TabContextProviderControlledProps>({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          onChange: expect.anything(),
          value: 0,
          children,
        })
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            onChange: expect.anything(),
            value,
            idPrefix,
          })

          return null
        }

        await mountAndCheckA11Y(
          <TabContextProviderControlled {...contextValues}>
            <ConsumerComponent expectedValues={{ ...contextValues, idPrefix: testId }} />
          </TabContextProviderControlled>,
        )
      })
    })
  })
})
