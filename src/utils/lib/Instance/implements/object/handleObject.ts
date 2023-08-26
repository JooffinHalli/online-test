import { _ } from 'utils/lib/_';
import { instance as Instance } from '../../';
import { ANY_KEY, assert, Assert } from '../../utils';
import { Implementation, ImplementationOf } from '../types';

export const isObject = (imp: unknown): imp is ImplementationOf<'object'> => {
  return imp instanceof Object;
}

export const assertObject: Assert<ImplementationOf<'object'>> = (x: unknown) => {
  assert(isObject(x), 'instance should be an object');
}

export const handleObject = (
  instance: unknown,
  imp: ImplementationOf<'object'>
) => {

  assertObject(instance);

  const hasAnyKey = (ANY_KEY in imp);

  return Object.keys(hasAnyKey ? instance : imp).every((k) => {

    const isOptional = k.endsWith('?');
    const _k = hasAnyKey ? k : isOptional ? k.split('?')[0] : k;
    const typeHasKey = (k in imp);
    const instHasKey = (_k in instance);

    if (isOptional && !instHasKey) {
      return true;
    }

    const t = imp[typeHasKey ? k : hasAnyKey ? ANY_KEY : k];
    const v = instance[_k];

    const isArray = _.typeOf(imp).is('array');
    const isFunc = _.typeOf(v).is('function');

    const el = isArray ? `element` : isFunc ? `method` : `field`;
    const name = `${el} '${k}'`;

    if (!hasAnyKey && !(_k in (hasAnyKey ? imp : instance))) {
      throw new Error(`${name} is missing`);
    }

    switch (t) {
      case '$same': {
        return assert(
          _k === v?.toString(),
          `${name} equals to '${v}', but should be equal to '${_k}'`
        );
      }
      case 'null': {
        return assert(
          v === null,
          `${name} equals to '${v}', but should be equal to ${t}`
        );
      }
      case 'set': {
        return assert(
          v instanceof Set,
          `${name} should be an instance of ${t}`
        );
      }
      case 'map': {
        return assert(
          v instanceof Map,
          `${name} should be an instance of ${t}`
        );
      }
      case 'array': {
        return assert(
          Array.isArray(v),
          `${name} should be an instance of ${t}`
        );
      }
      case 'undefined':
      case 'boolean':
      case 'number':
      case 'string':
      case 'symbol':
      case 'function': {
        return assert(
          typeof v === t,
          `${name} is ${_.smartTypeOf(v)}, but should be ${t}`
        );
      }
      default: {
        if (t instanceof Object) {

          assert(
            _.smartTypeOf(t) === _.smartTypeOf(v),
            `${name} is ${_.smartTypeOf(v)}, but should be ${_.smartTypeOf(t)}`
          );

          if (t instanceof Function) {

            const tReturnType = (t as Function)();
            let vReturnType;
            try { vReturnType = (v as Function)(); }
            catch (e) {
              throw new Error(`${name} did throw ${e}, but should return ${tReturnType}`);
            }

            if (!_.isPrimitive(tReturnType) && !_.isPrimitive(vReturnType)) {
              return Instance(vReturnType).implements(tReturnType);
            }

            const vTypeOf = _.smartTypeOf(vReturnType);

            assert(
              tReturnType === vTypeOf,
              `${name} returns ${vTypeOf}, but should return ${tReturnType}`
            );

          }

          return Instance(v).implements(t as Implementation);
        }

        throw new Error('do not implement');
      }
    }
  });

}