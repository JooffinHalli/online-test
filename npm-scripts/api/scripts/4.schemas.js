const { Template, Files, isObj, toString, ignoredFields } = require('../utils');

/**
 * Генерирует src/api/openApi/schemas.ts файл
 * @param {{ [k in 'paths' | 'components']: Record<string, any> }} openApiObj 
 */
function genOpenapiSchemas(openApiObj) {
  const { repoLink, repoBranch } = this;

  const validate = (obj, acc = {}) => {
    for (const k in obj) {
      if (k in ignoredFields) continue;
      const el = obj[k];
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

  const { components: { schemas }  } = validate(openApiObj);

  const template = Template.content(
    repoLink,
    repoBranch,
    `export const schemas = ${toString(schemas)} as const;`
  );

  Files.write('../../src/api/openApi/schemas.ts', template);
}

module.exports = genOpenapiSchemas;