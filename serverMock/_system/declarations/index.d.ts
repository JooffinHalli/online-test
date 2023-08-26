/**
*  ......................................................................................................
*  . этот файл генерируется и обновляется сам при добавлении или удалении эндпойнтов с помощью скриптов .
*  ......................................................................................................
*/

type StoreKey =
  | 'tests'
  
/**
 * глобально доступен только из файлов store/<tests>/index.ts. store можно мутировать
 */
declare const store: { [K in StoreKey]: any }

declare type Params = {
  /**
   * массив параметров, приходящих после слэша.
   * Если запрос такой: user/a/b/c, то массив будет ['a', 'b', 'c']
   */
  slashParams: string[]
  /**
   * объект параметров после знака вопроса.
   * Если запрос такой: user?a=1&b=2, то объект будет { a: '1', b: '2' }
   */
  queryParams: { [key: string]: string }
  /**
   * тело запроса, для GET и DELETE запросов всегда undefined, для остальных методов может иметь любой тип
   */
  body: any
}