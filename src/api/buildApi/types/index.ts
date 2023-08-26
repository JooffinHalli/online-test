import { Arr, Obj, Union, _ } from 'utils';

// once written generic makes life easier in the future

type MethodInfo<HttpMethod> = {
  entity?: unknown
  params?: { [K: string]: string | number | boolean }
  body?: HttpMethod extends ('post' | 'put' | 'delete')
    ? (BodyInit | Record<string, any>)
    : never
  headers?: HeadersInit
  res: unknown
}

export type DocsBase = {
  [Endpoint: string]: {
    [M in Lowercase<Http.Method>]?: MethodInfo<M>
  }
}

export type Config<
  D // Docs
> = {
  url: (typeof __API_URL__) extends never ? string : (typeof __API_URL__)
  /** Нужен, чтобы проитерироваться по нему и построить апи */
  endpoints: {
    [E in keyof D]: Arr.Sort<Union.ToTupple<Exclude<keyof D[E], 'path'>>, HttpMethodArr> extends HttpMethodArr
      ? Readonly<['all']>
      : Readonly<Arr.Sort<Union.ToTupple<Exclude<keyof D[E], 'path'>>, HttpMethodArr>>
  }
}

type MethodField<
  D, // Docs
  E extends string, // Endpoint
  M extends string, // HttpMethod
  F extends keyof MethodInfo<M> // Field (body | headers | res | params)
> =
  D extends { [K in E]: { [K in M]: { [K in F]: infer V } } }
    ? { [K in F]: V }
    : D extends { [K in E]: { [K in M]: { [K in F]?: infer V } } }
      ? { [K in F]?: V }
      : { [K in F]?: never };

type Path<
  D, // Docs
  E extends string // Endpoint
> =
  D extends { [K in E]: { path: infer P } }
    ? E extends P ? { path?: P } : { path: P }
    : { path?: E }

type ExtraArgs = {
  /**
   * указываем, какой тип данных ожидаем с сервера,
   * в зависимости от этого поля у респонса будет вызываться соответствующий метод,
   * по дефолту стоит `json`
   */
  responseType?: 'json' | 'text' | 'formData' | 'blob' | 'arrayBuffer'
}

type MethodArgs<
  D, // Docs
  E extends string, // Endpoint
  M extends string // HttpMethod
> =
  MethodField<D, E, M, 'params'>
  & Path<D, E>
  & MethodField<D, E, M, 'body'>
  & { headers?: Http.RequestHeaders }
  & ExtraArgs;

type MethodFn<
  D, // Docs
  E extends string, // Endpoint
  M extends string // HttpMethod
> =
  Obj.MaybeEmpty<MethodArgs<D, S<E>, S<M>>> extends true
    ? (args?: Obj.Undefinedable<MethodArgs<D, S<E>, S<M>>>) => Promise<_.Defined<MethodField<D, S<E>, S<M>, 'res'>['res']>>
    : (args: MethodArgs<D, S<E>, S<M>>) => Promise<_.Defined<MethodField<D, S<E>, S<M>, 'res'>['res']>>;

/** Тип, который возвращает функция buildApi */
export type BackendService<D extends DocsBase> = {
  [E in keyof D]: {
    [M in Exclude<keyof D[E], 'path'>]: MethodFn<D, S<E>, S<M>>
  }
}

type HttpMethodArr = Union.ToTupple<Lowercase<Http.Method>>;

/** достает из юниона только строки */
export type S<T> = Union.String<T>;