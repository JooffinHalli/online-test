/** простые утилиты */
export namespace _ {
  
  /** not undefined */
  export type Defined<T> = T extends undefined ? never : T;
          
  export type Assert<T> = (x: any) => asserts x is T;

}