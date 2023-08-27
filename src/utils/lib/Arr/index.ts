import { Union } from 'utils';

/** утилиты для массивов */
export namespace Arr {

  /** Юнион тип из элементов массива */
  export type Union<T extends readonly any[]> = T[number];

  export type Prepend<A extends unknown[], T> = [T, ...A];

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