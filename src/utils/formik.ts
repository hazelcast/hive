import { FieldMetaProps } from 'formik'

export const getFieldError = <T>(meta: FieldMetaProps<T>) => (meta.touched || meta.initialError === meta.error ? meta.error : undefined)

export type FieldValidatorGeneric<T> = (value: T) => string | void | Promise<string | void>

export const formikTouchAndUpdate =
  <T>(setValue: (value: T) => void, setTouched: (touched: boolean, shouldValidate?: boolean) => void) =>
  (newValue: T) => {
    // TODO: setTouched called after setValue refires validation with an old value. File a bug.
    // No need to validate at this point as all validators will run because of `setValue`
    setTouched(true, false)
    setValue(newValue)
  }
