/** утилиты для компонентов */
export namespace Comp {

  /** Достает пропсы из компонента */
  export type Props<T> = T extends (FC<infer P> | CC<infer P>) ? P : never;

  /** Function Component */
  type FC<P = {}> = React.ComponentType<P>;
  
  /** Class Component */
  type CC<P = {}> = React.Component<P>;
}