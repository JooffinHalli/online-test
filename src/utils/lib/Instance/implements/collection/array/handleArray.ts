import { _ } from 'utils';
import { ImplementationOf } from '../../types';
import { assert } from '../../../utils';
import { assertObject, handleObject } from '../../object/handleObject';

export const isArray = (imp: ImplementationOf<'collection'>): imp is ImplementationOf<'array'> => {
  return imp[1]?.toString().includes('...');
}

const getInfo = (imp: ImplementationOf<'array'>) => {
  const _imp = [...imp];
  const _hasLength = (_imp.length === 3) && _.typeOf(_imp.at(-1)).is('number');
  const length = _hasLength ? _imp.pop() : undefined;
  const _dots = _imp.pop();
  const canBeEmpty = _dots?.toString().includes('?');
  const itemImp = _imp[0];

  return { canBeEmpty, length, itemImp };
}

export const handleArray = (
  instance: ImplementationOf<'collection'>,
  imp: ImplementationOf<'array'>
) => {

  const { canBeEmpty, length, itemImp } = getInfo(imp);
  
  const instLength = instance.length;

  if (!!length) {
    assert(
      instLength === length,
      `instance's length is ${instLength}, but should be ${length}`
    );
  }

  if (canBeEmpty && !instLength && !length) {
    return true;
  }

  if (!canBeEmpty) {
    assert(!!instLength, `instance should have length`);
  }

  assertObject(itemImp);

  for (let i = 0; i < instance.length; i++) {
    try {
      handleObject(instance[i], itemImp);
    }
    catch (e: any) {
      throw new Error(`instance['${i}']: ${e.message}`)
    }
  }

  return true;

}