import { FieldMetaProps } from 'formik'

export const getFieldError = <T>(meta: FieldMetaProps<T>) => (meta.touched || meta.initialError === meta.error ? meta.error : undefined)

export type FieldValidatorGeneric<T> = (value: T) => string | void | Promise<string | void>
