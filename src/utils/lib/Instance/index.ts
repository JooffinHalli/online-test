import { assertObject } from './utils';
import { _implements } from './implements';
import { Implementation } from './implements/types';

/**
 * Принимает объект или массив и позволяет в рантайме проверить имплементирует ли он интерфейс,
 * если нет, то выбрасывается ошибка
 */
export const instance = (instance: unknown) => {

  assertObject(instance);

  return {
    implements: (imp: Implementation) => {
      return _implements(instance, imp);
    }
  }
};