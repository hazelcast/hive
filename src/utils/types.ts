export type ExtractKeysOfValueType<T, KV> = { [K in Extract<keyof T, string>]: T[K] extends KV ? K : never }[Extract<keyof T, string>]
