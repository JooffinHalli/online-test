import { Obj } from 'utils';

/** простые утилиты */
export namespace _ {

  /** arg is truthy by `!!` operator */
  export const isTruthy = <T>(v: T): v is Truthy<T> => !!v;

  /** every arg is truthy by `!!` operator */
  export const areTruthy = (...args: unknown[]) => args.every(isTruthy);

  /** is undefined or null */
  export const no = (v: unknown): v is (undefined | null) => (
    (v === undefined) || (v === null)
  );

  /** is not undefined or null */
  export const thereIs = <T>(v: T): v is NonNullable<T> => !no(v);

  /** every arg is not undefined or null */
  export const thereAre = (...args: unknown[]) => args.every(thereIs);

  export const equalByToString = (v1?: String | Number, v2?: String | Number) => (
    v1?.toString() === v2?.toString()
  );
 
  /**
   * @example
   * const isOneOrTwo = value(1).is(1, 2) // true
  */
  export const value = (x: unknown) => ({
    is: (...args: unknown[]) => args.some(arg => arg === x)
  });

  export const smartTypeOf = (v: unknown) => v === null
    ? 'null'
    : Array.isArray(v)
      ? 'array'
      : (v instanceof Set)
        ? 'set'
        : (v instanceof Map)
          ? 'map'
          : typeof v;

  /**
   * @example
   * const areNumOrStrOrBool = typeOf(1, 2, 3).is('number') // true
  */
  export const typeOf = (...values: unknown[]) => ({
    is: (...types: ReturnType<typeof smartTypeOf>[]) => {
      return types.some(t => values.every(v => smartTypeOf(v) === t))
    }
  });

  export const isPrimitive = <T = PrimitiveName>(v: unknown): v is T => (
    typeOf(v).is('undefined', 'null', 'boolean', 'number', 'string', 'symbol', 'bigint')
  );

  export const toBlob = (v: string | number) => {
    return new Blob([v!.toString()], { type: 'application/json' });
  }
  
  export const uuid = () => {
    return Math.floor(Math.random() * 100) + Date.now();
  }

  export const assert = <T extends (string | Error)>(cond: boolean, err: T, cb?: (err: T) => void) => {
    if (!cond) {
      if (cb) cb(err);
      throw typeof err === 'string' ? new Error(err) : err;
    }
    return true;
  }
  
  /** not undefined */
  export type Defined<T> = T extends undefined ? never : T;
  
  export type JSONable = Obj.Any | any[];
  
  export type Primitive = string | number | boolean | undefined | null | symbol | bigint;
  
  export type PrimitiveName = 'string' | 'number' | 'boolean' | 'undefined' | 'null' | 'symbol' | 'bigint';
  
  export type Truthy<T> = T extends (undefined | null | 0 | '' | false) ? never : T;
  
  export type Assert<T> = (x: any) => asserts x is T;

}