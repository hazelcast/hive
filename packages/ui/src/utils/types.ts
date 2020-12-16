export type ExtractKeysOfValueType<T, KV> = { [K in keyof T]: T[K] extends KV ? K : never }[keyof T]

export type NeverObject<T extends object> = {
  [K in keyof T]?: never
}
