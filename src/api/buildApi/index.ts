import { DocsBase, Config, BackendService } from './types';
import { handleResDefault, logError, normalizeHeaders, serializeParams, serializedBody } from './utils';

/**
 * Функция buildApi принимает в себя Дженерик тип (см DocsBase)
 * в котором описана типизация эндпойнтов (что ожидает и что возвращает каждый эндпойнт)
 * и объект с настройками, уже на уровне js, в котором описано какие будут
 * эндпойнты, методы, сообщения об ошибках.
 * Функция возвращает удобный и полностью типизированный объект с методами.
 * Ts будет вести и не даст возможности внести невалидные настройки
 * или вызвать методы, которых нет.
 * Для продакшена функция не готова, ее функциональность урезана.
*/

/** Строит объект для работы с апи */
export const buildApi = <D extends DocsBase>(config: Config<D>): BackendService<D> => {
  const _config: any = config; // any is ok inside of this function

  const api = {} as any;

  for (const endpoint in _config.endpoints) {
    api[endpoint] = {};

    for (var i = 0; i < _config.endpoints[endpoint].length; i++) {
      const method = _config.endpoints[endpoint][i];

      const handleErr = (err: Error) => {
        logError(endpoint, method, err.message);
        throw err;
      }

      const methodFn = (args: any = {}) => {
        const {
          path,
          params,
          body,
          headers = { 'Content-Type': 'application/json' },
          responseType = 'json'
        } = args;

        const parameters = serializeParams(params);
        
        const url = `${_config.url}/${path || endpoint}${parameters}`;

        const options =  {
          method: method.toUpperCase(),
          headers: normalizeHeaders(headers),
          body: serializedBody(headers, body)
        }

        const handleRes = responseType === 'json' ? handleResDefault : (res: Response) => {
          if (!res.ok) throw new Error('unknown error');
          return res[responseType]();
        }

        return fetch(url, options).then(handleRes).catch(handleErr);
      }

      api[endpoint][method] = methodFn;
    }

  }

  return api;
}