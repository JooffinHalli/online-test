import { buildApi } from './buildApi';
import { endpoints } from './endpoints';
import { Docs } from './docs';

export const api = buildApi<Docs>({
  url: 'http://localhost:7777',
  endpoints
});