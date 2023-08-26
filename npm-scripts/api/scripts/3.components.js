const { Template, Files, isObj, toString, ignoredFields } = require('../utils');

/**
 * Генерирует src/api/openApi/components.ts файл
 * @param {{ [k in 'paths' | 'components']: Record<string, any> }} openApiObj 
 */
function genOpenapiComponents(openApiObj) {
  const { repoLink, repoBranch } = this;

  const validate = (obj, acc = {}) => {
    for (const k in obj) {
      if (k in ignoredFields) continue;
      const el = obj[k];
      const kIsRef = k === '$ref';
      const elIsRef = el?.toString().startsWith('#/');
      const isSchemaLink = el?.toString().startsWith('#/components/schemas');
      const isSchema = k in openApiObj.components.schemas;
      if (isSchema) {
        acc[k] = `__schemas.${k}__`;
        continue;
      }
      if (kIsRef && elIsRef) {
        if (isSchemaLink) {
          acc = `__${el
            .replace('#/components/', '')
            .replaceAll(/\//g, '.')}__`
          continue;
        }
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
      acc[k] = isObj(el) ? validate(el) : el;
    }
    return acc;
  }

  const { components } = validate(openApiObj);

  const template =Template.content(
    repoLink,
    repoBranch,
    genTemplate(toString(components))
  );

   Files.write('../../src/api/openApi/components.ts', template);
}

module.exports = genOpenapiComponents;

function genTemplate(content) {
  return `import { schemas } from './schemas';

export const components = ${content} as const;`
}