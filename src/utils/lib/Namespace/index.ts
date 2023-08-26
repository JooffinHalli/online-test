import { Obj, Comp } from 'utils';

/** утилиты для работы с неймспейсами (файлами) */
export namespace NS {

  export namespace Of {

    export namespace Components {

      /** Создает юнион тип из пропсов компонентов, экспортируемых из неймспейса (файла) */
      export type PropsUnion<N> = N extends { [K: string]: infer C } ? Comp.Props<C> : never;

      /** Создает тип объекта, где ключ это название компонента, а значение это пропсы компонента */
      export type NamePropsDict<N> = N extends { [K in keyof N]: any }
        ? { [M in keyof N]: Comp.Props<N[M]> }
        : never;

    }
  }

  /** Юнион из названий переменных экспортируемых из неймспейса (файла) */
  export type KeysUnion<N extends Obj.Any> = Obj.KeysUnion<N>;
  
}