import { Union } from 'utils';

/** утилиты для массивов */
export namespace Arr {

  export const isArr = <T = any>(x: unknown): x is (Array<T> & []) => Array.isArray(x);

  /**
   * @example
   * toEnum([1, '2']) // { 1: 1, 2: '2' }
  */
  export const toEnum = <T extends readonly (string | number)[]>(arr: T) => (
    arr.reduce<ToEnum<T>>((acc, el) => (acc[el] = el, acc), {} as ToEnum<T>)
  );


  /** Юнион тип из элементов массива */
  export type Union<T extends readonly any[]> = T[number];

  export type Prepend<A extends unknown[], T> = [T, ...A];

  export type ToEnum<T extends readonly any[]> = { readonly [K in T[number]]: K };

  export type Exclude<
    T extends readonly any[],
    U extends T[number][] | T[number]
  > = U extends T[number]
    ? Exclude<T, [U]>
    : T extends [infer F, ...infer R]
      ? F extends U[number]
        ? [...Exclude<R, U>]
        : [F, ...Exclude<R, U>]
      : [];

  export type Sort<
    A1 extends readonly unknown[],
    A2 extends readonly unknown[],
    Acc extends readonly unknown[] = []
  > = A2[0] extends A1[number]
    ? Sort<Exclude<A1, A2[0]>, Exclude<A2, A2[0]>, [...Acc, A2[0]]>
    : A2[1] extends A1[number]
      ? Sort<Exclude<A1, A2[0] | A2[1]>, Exclude<A2, A2[0] | A2[1]>, [...Acc, A2[1]]>
      : A1[number] extends never ? [...Acc] : [...Acc, ...Union.ToTupple<A1[number]>];
      
}