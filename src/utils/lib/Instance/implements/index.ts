import { handleCollection, isCollection } from './collection/handleCollection';
import { handleObject, isObject } from './object/handleObject';
import { Implementation } from './types';

export const _implements = (instance: unknown, imp: Implementation) => {
  if (isCollection(imp)) {
    return handleCollection(instance, imp);
  }
  if (isObject(imp)) {
    return handleObject(instance, imp);
  }

  throw new Error('some error occured');
};