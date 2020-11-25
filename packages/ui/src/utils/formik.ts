import { FieldMetaProps } from 'formik'

export const getFieldError = <T>(meta: FieldMetaProps<T>) => (meta.touched || meta.initialError === meta.error ? meta.error : undefined)
