const { Template, Files, isObj, toString, ignoredFields } = require('../utils');

const handlers = {
  'string': `__T.str('')__`,
  'integer': `__T.num(0)__`,
  'boolean': `__T.bool(false)__`
}

const optionalHandlers = {
  'string': `__T.str_undf()__`,
  'integer': `__T.num_undf()__`,
  'boolean': `__T.bool_undf()__`
}

const toMst = (schema) => {
  const acc = {};
  const { properties, required = [] } = schema;
  for (const field in properties) {
    const subSchema = properties[field];
    const isRequired = required.includes(field);
    acc[field] = (isRequired ? handlers : optionalHandlers)[subSchema.type];
  }
  return acc;
}

const getMstSchemas = (schemas) => {
  const acc = {};
  for (const schemaName in schemas) {
    acc[schemaName] = toMst(schemas[schemaName]);
  }
  return acc;
}

/**
 * Генерирует src/mst/schemas/ModelName.ts файлы
 * @param {{ [k in 'paths' | 'components']: Record<string, any> }} openApiObj 
 */
function genMstSchemas(openApiObj) {
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

  Files.create('../../src/mst/schemas');

  const { components } = validate(openApiObj);
  const schemas = getMstSchemas(components.schemas);

  for (const schema in schemas) {
    const name = schema.replace('Model', 'Schema');
    const template = Template.content(
      repoLink,
      repoBranch,
      getTemplate(name, toString(schemas[schema]))
    );
    Files.write(`../../src/mst/schemas/${name}.ts`, template);
  }

  const template = Template.content(
    repoLink,
    repoBranch,
    `${Object.keys(schemas).map((schema, i, arr) => {
      const isLast = i === arr.length;
      const name = schema.replace('Model', 'Schema');
      return isLast
        ? `export * from './${name}';`
        : `export * from './${name}';\n`
    }).join('')}`);

  Files.write(`../../src/mst/schemas/index.ts`, template);
}

module.exports = genMstSchemas;

function getTemplate(content1, content2) {
  return `import * as T from 'mst/utils/types';

export const ${content1} = ${content2} as const;`
}