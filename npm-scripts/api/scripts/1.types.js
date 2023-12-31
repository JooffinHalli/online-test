const { Path, Template, Files } = require('../utils');

/**
 * Генерирует src/api/docs.ts файл,
 * в котором описывается тайпскриптовая документация для фронтового апи.
 * @param {{ [k in 'paths' | 'components' | 'servers']: Record<string, any> }} openApiObj 
 */
function genOpenapiTypeDocs(openApiObj) {

  const docs = new Docs(openApiObj);
  let entities = '';
  for (const path in openApiObj.paths) {
    if (!('get' in openApiObj.paths[path])) break;
    const _path = Path.normalize(path);
    const [firstLetter, ...rest] = _path;
    entities += `\nexport type ${firstLetter.toUpperCase()}${rest.join('')} = Docs['${_path}']['get']['res'];`
  }
  const template = Template.content(
    `/** Документация эндпойнтов */\nexport type Docs = ${docs.ts};\n${entities}`
  );
  Files.write('../../src/api/docs.ts', template);

  let urlsDeclaration = '/** возможный url */\ndeclare const __API_URL__:';
  for (const { url } of openApiObj.servers) urlsDeclaration += `\n  | '${url}'`;
  const urlsDeclarationTemplate = Template.content(urlsDeclaration);
  Files.write('../../src/api/declarations.d.ts', urlsDeclarationTemplate);
}

module.exports = genOpenapiTypeDocs;

class Docs {

  constructor(obj) {
    this.#original = obj;
    this.#build(this.#original);
  }

  get ts() {
    return DocsJSON.normalize(this.json);
  };

  get json() {
    return JSON.stringify(this.#acc, null, 2);
  };

  #original = {};
  #acc = {};

  #build() {
    for (const path in this.#original.paths) {
      const el = this.#original.paths[path];
      const normPath = Path.normalize(path);
      const endpoint = this.#acc[`'${Path.static(normPath)}'`] = {};
      endpoint.path = Path.toTs(normPath);
      for (const method in el) {
        endpoint[method] = new Method(el[method]).ts
      }
    }
  }

}

class Method {

  /**
   * @param {Record<string, any>} methodObj
   */
  constructor(methodObj) {
    this.#original = methodObj;
    this.#build(this.#original);
  }

  get ts() {
    return this.#acc;
  }

  #original = {};
  #acc = null;

  #build(obj) {
    const params = new Params(obj.parameters).ts;
    const body = new Body(obj.requestBody).ts;
    const res = new Res(obj.responses).ts;
    this.#acc = {};
    if (params) this.#acc.params = params;
    if (body) this.#acc.body = body;
    if (res) this.#acc.res = res;
  }

}

class Params {
  constructor(parameters) {
    this.#original = parameters;
    this.#build(this.#original);
  }

  get ts() {
    return this.#acc;
  }

  #original = {};
  #acc = null;

  #build(parameters) {
    if (!parameters) return;
    this.#acc = {};
    for (const parameter of parameters) {
      const { name, in: In, schema, required } = parameter;
      if (In === 'query') {
        this.#acc[!required ? `${name}?` : name] = new SchemaHandler(schema).ts;
      }
    }
    if (!Object.keys(this.#acc).length) {
      this.#acc = null;
    }
  }
}

class Body {
  constructor(requestBody) {
    this.#original = requestBody;
    this.#build(this.#original);
  }

  get ts() {
    return this.#acc;
  }

  #original = {};
  #acc = null;

  #build(requestBody) {
    if (!requestBody) return;
    const { content } = requestBody;
    for (const format in content) {
      const { schema } = content[format];
      const { ts } =  new SchemaHandler(schema);
      switch (format) {
        case 'application/json': {
          this.#acc = ts;
          break;
        }
        case 'multipart/form-data': {
          const json = DocsJSON.normalize(
            JSON.stringify(ts),
            {
              ':': ': ',
              '{': '{ ',
              '}': ' }',
              ',': '; ',
            }
          );
          this.#acc = `FormData // ${json}`;
        }
      }
    }
  }
}

class Res {

  /**
   * @param {Record<string, any>[]} responses
   */
  constructor(responses) {
    this.#original = responses;
    this.#build(this.#original);
  }

  get ts() {
    return this.#acc;
  }

  #original = {};
  #acc = null;

  #build(responses) {
    for (const status in responses) {
      if ((+status === 200) || (+status === 201)) {
        const { content } = responses[status];
        for (const format in content) {
          if (format === 'application/json') {
            const { schema } = content[format];
            this.#acc = new SchemaHandler(schema).ts;
          }
        }
      }
    }
  }

}

class SchemaHandler {

  constructor(schema, isRequired) {
    this.#original = schema;
    this.#isRequired = isRequired;
    this.#handle(this.#original);
  }

  #original = {};
  #isRequired = false;
  #acc = null;

  get ts() {
    return this.#acc;
  }

  #handleOneOf(schema) {
    let acc = '';
    for (const oneSchema of schema.oneOf) {
      let newType = new SchemaHandler(oneSchema, true).ts;
      if (Array.isArray(newType)) {
        newType = `Array<${newType}>`;
      }
      acc += `${acc ? ' | ' : ''}${newType}`;
    }
    return acc;
  }

  #handle(schema) {
    if (Array.isArray(schema.oneOf)) {
      this.#acc = this.#handleOneOf(schema);
      return;
    }
    let type = schema.type || (('items' in schema) ? 'array' : undefined);
    if (schema.enum?.length) type = 'enum';
    const handler = this.#TYPE_HANDLER[type];
    this.#acc = handler(schema);
  }

  #TYPE_HANDLER = {
    'boolean': this.#handleBoolean.bind(this),
    'integer': this.#handleInteger.bind(this),
    'string': this.#handleString.bind(this),
    'enum': this.#handleEnum.bind(this),
    'object': this.#handleObject.bind(this),
    'array': this.#handleArray.bind(this)
  }

  #assertNullability(type) {
    return !this.#isRequired ? `${type}` : type;
  }

  #handleBoolean() { return this.#assertNullability('boolean'); }
  #handleInteger() { return this.#assertNullability('number'); }
  #handleString() { return this.#assertNullability('string'); }

  #handleEnum(schema) {
    return schema.enum?.map((value) => `'${value}'`).join(' | ');
  }

  #handleObject(schema) {
    const acc = {};
    const { properties, required = [] } = schema;
    for (const field in properties) {
      const subSchema = properties[field];
      const isRequired = required.includes(field);
      acc[!isRequired ? `${field}?`: field] = new SchemaHandler(subSchema, isRequired).ts;
    }
    return acc;
  }

  #handleArray(schema) {
    return [new SchemaHandler(schema.items).ts];
  }
}

class DocsJSON {

  static normalize(json, options = {}) {
    let newJson = json;
    const allOptions = {
      '"': '',
      ',': '',
      '[': 'Array<',
      ']': '>',
      ...options
    }
    for (const sign in allOptions) {
      const replacer = allOptions[sign];
      newJson = newJson.replaceAll(sign, replacer);
    }
    return newJson;
  }

}