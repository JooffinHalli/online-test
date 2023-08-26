/** утилиты для мапы */
export namespace $Map {

  /** как forEach, только итерируется по ключам, а не свойствам */
  export const forIn = <K, V>(map: Map<K, V>, ...cbs: ((k: K) => void)[]) => {
    for (const k of map.keys()) cbs.forEach(cb => cb(k));
  }

  /** как forEach, только итерируется по ключам, а не свойствам */
  export const isMap = <K = unknown, V = unknown>(v: any): v is Map<K, V> => {
    return v instanceof Map;
  }

  
  /** Юнион тип из ключей мапы */
  export type KeysUnion<T> = T extends Map<infer K, unknown> ? K : never;
}