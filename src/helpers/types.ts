export type PartialRequired<T extends object, RequiredKeys extends keyof T> = T & { [Key in RequiredKeys]-?: T[Key] }

export type PartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<T>

// https://github.com/microsoft/TypeScript/issues/12936
export type Exact<T, R> = T extends R ? (R extends T ? T : never) : never

export type Tuple<TItem, TLength extends number> = TLength extends 1
  ? [TItem]
  : TLength extends 2
    ? [TItem, TItem]
    : TLength extends 3
      ? [TItem, TItem, TItem]
      : TLength extends 4
        ? [TItem, TItem, TItem, TItem]
        : TLength extends 5
          ? [TItem, TItem, TItem, TItem, TItem]
          : TLength extends 6
            ? [TItem, TItem, TItem, TItem, TItem, TItem]
            : TLength extends 7
              ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem]
              : TLength extends 8
                ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem]
                : TLength extends 9
                  ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem]
                  : TLength extends 10
                    ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem]
                    : TLength extends 11
                      ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem]
                      : TLength extends 12
                        ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem]
                        : TLength extends 13
                          ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem]
                          : TLength extends 14
                            ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem]
                            : TLength extends 15
                              ? [TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem, TItem]
                              : TLength extends 16
                                ? [
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                    TItem,
                                  ]
                                : TItem[]

export interface FailureStateBase {
  message: string
}
// https://github.com/redux-utilities/flux-standard-action
export type FailureAction<T, P extends FailureStateBase = FailureStateBase> = {
  type: T
  payload: P
  error: true
}

export type DataTestProp = {
  'data-test'?: string
}

export const assertType = <T>(val: T) => val
