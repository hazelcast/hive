export type ExtractKeysOfValueType<T, KV> = { [K in keyof T]: T[K] extends KV ? K : never }[keyof T]
