import { $nonEmptyObject } from 'mobx-state-tree/dist/internal';
import { Arr } from 'utils';

/** утилиты для юнионов */
export namespace Union {

  /** Очищает юнион от системных типов */
  export type Clear<T> = T extends (typeof $nonEmptyObject | symbol) ? never : T;

  /** достает из юниона только строки */
  export type String<T> = T extends (`${infer X}` | string) ? X & T : never;

  /** превразает юнион в массив */
  export type ToTupple<
    T, Acc extends unknown[] = [], Last = LastElement<T>
  > = [T] extends [never] ? Acc : ToTupple<Exclude<T, Last>, Arr.Prepend<Acc, Last>>;

  type LastElement<T> = ToIntersectionFn<T> extends () => infer R ? R : never;
  
  type ToIntersectionFn<T> = (T extends T ? ((x: () => T) => unknown) : never) extends (x: infer R) => unknown ? R : never;
}