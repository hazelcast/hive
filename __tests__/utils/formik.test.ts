import { FieldMetaProps } from 'formik'
import { getFieldError } from '../../src/utils/formik'

describe('utils/formik', () => {
  describe('getFieldError', () => {
    it('returns error if field is touched', () => {
      const meta: FieldMetaProps<string> = {
        touched: true,
        error: 'Dark side',
        initialTouched: false,
        value: 'yoda',
      }

      expect(getFieldError(meta)).toBe('Dark side')
    })

    it('returns error if initialError equals error', () => {
      // If initialError equals error and the field is not touched, it means the error was rendered by the server when it rendered the field initially
      const meta: FieldMetaProps<string> = {
        touched: false,
        error: 'Dark side',
        initialTouched: false,
        initialError: 'Dark side',
        value: 'yoda',
      }

      expect(getFieldError(meta)).toBe('Dark side')
    })

    it('returns undefined if initialError does not equal error', () => {
      // It is kind of an impossible situation, but we will check nevertheless
      const meta: FieldMetaProps<string> = {
        touched: false,
        error: 'Dark side1',
        initialTouched: false,
        initialError: 'Dark side2',
        value: 'yoda',
      }

      expect(getFieldError(meta)).toBe(undefined)
    })

    it('returns undefined if field is not touched and there is no initial error', () => {
      const meta: FieldMetaProps<string> = {
        touched: false,
        error: 'Dark side1',
        initialTouched: false,
        value: 'yoda',
      }

      expect(getFieldError(meta)).toBe(undefined)
    })

    it('returns undefined if field is touched and there is no error', () => {
      const meta: FieldMetaProps<string> = {
        touched: true,
        error: undefined,
        initialTouched: false,
        value: 'yoda',
      }

      expect(getFieldError(meta)).toBe(undefined)
    })
  })
})
