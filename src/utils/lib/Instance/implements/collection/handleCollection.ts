import { assert, Assert } from '../../utils';
import { ImplementationOf } from '../types';
import { handleArray, isArray } from './array/handleArray';
import { handleList, isList } from './list/handleList';

export const isCollection = (x: unknown): x is ImplementationOf<'collection'> => {
  return Array.isArray(x);
}

export const assertCollection: Assert<ImplementationOf<'collection'>> = (x: unknown) => {
  assert(isCollection(x), 'instance should be an array');
}

export const handleCollection = (
  instance: unknown,
  imp: ImplementationOf<'collection'>
) => {

  assertCollection(instance);

  if (isArray(imp)) {
    return handleArray(instance, imp);
  }
  if (isList(imp)) {
    return handleList(instance, imp);
  }

  return true;
}