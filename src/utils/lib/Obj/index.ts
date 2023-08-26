import { _, Union, Arr } from 'utils';

/** утилиты для объектов */
export namespace Obj {

  /** типизированный Object.entries */
  export const entries = <T extends Obj.Any>(o: T) => (
    Object.entries(o) as [Union.Clear<keyof T>, T[keyof T]][]
  );

  /** типизированный Object.keys */
  export const keys = <T extends Obj.Any>(o: T) => Object.keys(o) as Obj.Keys<T>;

  /** типизированный Object.keys */
  export const tupple = <T extends Obj.Any>(o: T) => Object.keys(o) as Union.ToTupple<Obj.Keys<T>[number]>;

  /** как map для массивов, только для ключей объекта */
  export const keysMap = <T extends Obj.Any, R = keyof T>(
    o: T,
    cb: (key: keyof T) => R = (x) => x as R
  ) => {
    const acc: R[] = [];
    for (const k in o) acc.push(cb(k));
    return acc;
  }

  /** как reduce для массивов, только для ключей объекта */
  export const keysReduce = <A, T>(
    o: T,
    cb: (acc: A, k: keyof T) => A,
    acc: A
  ) => {
    for (const k in o) acc = cb(acc, k);
    return acc;
  }

  /** вернет true, если v это объект, иначе false */
  export const isObj = <T>(v: T): v is Required<{ [K in keyof T]: T[K] }> => (
    (v !== null) &&
    !Array.isArray(v) &&
    (typeof v === 'object')
  )

  /** как forEach, только итерируется по ключам, а не свойствам */
  export const forIn = <O>(obj: Obj.Typed<O>, cb: (k: keyof O) => void) => {
    for (const k in obj) cb(k);
  }

  /** возвразает объект с keys, values, entries объекта */
  export const all = <O>(
    obj: Obj.Typed<O>,
    cb?: (k: keyof O, v: O[keyof O], e: [keyof O, O[keyof O]]
  ) => void) => {

    const keys = new Array<keyof O>();
    const values = new Array<O[keyof O]>();
    const entries = new Array<[keyof O, O[keyof O]]>();

    forIn(obj, (k) => {
      keys.push(k);
      values.push(obj[k]);
      entries.push([k, obj[k]]);
      if (cb) cb(k, obj[k], [k, obj[k]]);
    });

    return { keys, values, entries, original: obj };
  }

  /** Любой объект */
  export type Any = { [K: string]: any };

  /** Типизированный объект */
  export type Typed<T> = { [K in keyof T]: T[K] };

  /** Массив значений */
  export type Values<T extends Obj.Any> = T[keyof T][];

  /** Массив ключей */
  export type Keys<T extends Obj.Any> = Union.Clear<keyof T>[];

  /** Юнион тип из значений */
  export type ValuesUnion<T extends Obj.Any> = Arr.Union<Obj.Values<T>>;

  /** Юнион тип из ключей объекта */
  export type KeysUnion<T extends Obj.Any> = Arr.Union<Obj.Keys<T>>;

  export type isEmpty<T> = [keyof T] extends [never] ? true : false;

  export type OptionalKeysUnion<T> = { [P in keyof T]-?: {} extends Pick<T, P> ? P : never }[keyof T];

  export type MaybeEmpty<T> = isEmpty<T> extends true
    ? true
    : Union.ToTupple<Obj.OptionalKeysUnion<T>> extends Union.ToTupple<keyof T>
      ? true
      : false;

  /** если объект пустой, то undefined */
  export type Undefinedable<T> = isEmpty<T> extends true ? undefined : T;
}