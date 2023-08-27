import { _, Union } from 'utils';

/** утилиты для объектов */
export namespace Obj {

  export type isEmpty<T> = [keyof T] extends [never] ? true : false;

  export type OptionalKeysUnion<T> = { [P in keyof T]-?: {} extends Pick<T, P> ? P : never }[keyof T];

  /** Если объект пустой, то true, иначе false */
  export type MaybeEmpty<T> = isEmpty<T> extends true
    ? true
    : Union.ToTupple<Obj.OptionalKeysUnion<T>> extends Union.ToTupple<keyof T>
      ? true
      : false;

  /** если объект пустой, то undefined */
  export type Undefinedable<T> = isEmpty<T> extends true ? undefined : T;
}