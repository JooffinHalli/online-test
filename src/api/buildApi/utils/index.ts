const bodySerializer = {
  'application/json': JSON.stringify,
  DEFAULT: <T>(body: T) => body
} as const;

export const serializedBody = <T>(headers: Http.RequestHeaders = {}, body: T) => {
  const key = headers['Content-Type'] || 'DEFAULT';
  const serialize = bodySerializer[key];
  return serialize(body) as BodyInit;
}

export const normalizeHeaders = (headers: any): HeadersInit => headers;

export const serializeParams = <T>(params: T) => {
  let p = '';
  for (const key in params) {
    const value = params[key];
    if (!key || !value) continue;
    p += `${key}=${value}&`;
  }
  if (p.length) p = `?${p.slice(0, -1)}`;
  return p;
}

export const logError = (endpoint: string, method, err: string) => {
  console.error(
    `${new Date().toLocaleTimeString()} api.${endpoint}.${method}: ${err}`
  );
}

export const handleResDefault = (res: Response) => {
  if (!res.ok) throw new Error('unknown error');
  return res['json']();
}