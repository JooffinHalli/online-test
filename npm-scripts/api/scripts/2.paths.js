const { Template, Files, isObj, toString, ignoredFields } = require('../utils');

/**
 * Генерирует src/api/openApi/paths.ts файл
 * @param {{ [k in 'paths' | 'components']: Record<string, any> }} openApiObj 
 */
function genOpenapiPath(openApiObj) {
  const { repoLink, repoBranch } = this;

  const validate = (obj, acc = {}) => {
    for (const k in obj) {
      if (k in ignoredFields) continue;
      const el = obj[k];
      const kIsRef = k === '$ref';
      const elIsRef = el?.toString().startsWith('#/');
      if (kIsRef && elIsRef) {
        acc = `__${el
          .replace('#/', '')
          .replaceAll(/\//g, '.')}__`
        continue;
      }
      if (Array.isArray(el)) {
        acc[k] = [];
        for (const arrEl of el) {
          acc[k].push(isObj(arrEl) ? validate(arrEl) : arrEl);
        }
        continue;
      }
      const kHasSlashes = k.includes('/{');
      const key = kHasSlashes ? `/${k.split('/')?.[1]}` : k;
      acc[key] = isObj(el) ? validate(el) : el;
    }
    return acc;
  }

  const { paths } = validate(openApiObj);

  const content = toString(paths)
    .replaceAll(/(')(\/)(.*)(')(:)/g, (match, p1, p2, p3) => `'${p3}':`);

  const template = Template.content(
    repoLink,
    repoBranch,
    genTemplate(content)
  );

  Files.write('../../src/api/openApi/paths.ts', template);
}

module.exports = genOpenapiPath;

function genTemplate(content) {
  return `import { components } from './components';

export const paths = ${content} as const;`;
}