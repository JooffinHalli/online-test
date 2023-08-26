export const ANY_KEY = '$string';

export type Assert<T> = (x: any) => asserts x is T

export const assert = (cond: boolean, msg: string) => {
  if (!cond) throw new Error(msg);
  return true;
}

export const assertObject: Assert<Object> = (x: any) => {
  assert(x instanceof Object, 'instance should be an object or an array');
}