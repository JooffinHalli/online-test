/** простые утилиты */
export namespace _ {
  
  /** not undefined */
  export type Defined<T> = T extends undefined ? never : T;

}