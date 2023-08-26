import { assertObject, handleObject } from '../../object/handleObject';
import { ImplementationOf } from '../../types';

export const isList = (imp: ImplementationOf<'collection'>): imp is ImplementationOf<'list'> => {
  return Array.isArray(imp);
}

export const handleList = (
  instance: unknown,
  imp: unknown
) => {
  assertObject(instance);
  assertObject(imp);
  
  return handleObject(instance, imp);
}