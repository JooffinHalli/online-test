import { Arr } from 'utils';

/** утилиты для юнионов */
export namespace Union {

  /** достает из юниона только строки */
  export type String<T> = T extends (`${infer X}` | string) ? X & T : never;

  /** превразает юнион в картеж */
  export type ToTupple<
    T, Acc extends unknown[] = [], Last = LastElement<T>
  > = [T] extends [never] ? Acc : ToTupple<Exclude<T, Last>, Arr.Prepend<Acc, Last>>;

  type LastElement<T> = ToIntersectionFn<T> extends () => infer R ? R : never;
  
  type ToIntersectionFn<T> = (T extends T ? ((x: () => T) => unknown) : never) extends (x: infer R) => unknown ? R : never;
}