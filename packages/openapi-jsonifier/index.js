const yaml = require('js-yaml');

/** converts yaml to json, including handling references ($ref) */
class OpenApiJSONifier {

  /**
   * @param yamlContent {string} string in yaml markup
   * @param options {{
   *  parser: (str: string | Buffer) => Object
   *  beforeScripts: Array<(obj: Object) => string>,
   *  afterScripts: Array<(obj: Object) => string>
   * }}
   * @param options.parser {string} you may pass your own parser, by default is taken https://www.npmjs.com/package/js-yaml
   * @param options.beforeScripts callbacks called after parsing, but before handling refs
   * @param options.afterScripts callbacks called after handling refs
  */
  constructor(yamlContent, options = {}) {
    const _options = {
      parser: yaml.load,
      beforeScripts: [],
      afterScripts: [],
      ...options
    };
    const { parser, beforeScripts, afterScripts } = _options;
    this.#original = parser(yamlContent);
    for (const script of beforeScripts) script(this.#original);
    const objectWithRefs = this.#handleRefs(this.#original);
    for (const script of afterScripts) script(objectWithRefs);
    this.json = JSON.stringify(objectWithRefs, null, 2);
  }

  json = '';

  #original = {};

  #isObj = (x) => (typeof x === 'object') && (x !== null) && !Array.isArray(x);

  #handleRefs(obj, acc = {}) {
    for (const k in obj) {
      const el = obj[k];
      const kIsRef = k === '$ref';
      const elIsRef = el?.toString().startsWith('#');
      if (kIsRef && elIsRef) {
        const [hash, components, field, scopeObj] = el?.toString().split('/');
        const refValue = this.#original[components][field][scopeObj];
        acc = this.#isObj(refValue) ? this.#handleRefs(refValue) : refValue;
        continue;
      }
      if (Array.isArray(el)) {
        acc[k] = [];
        for (const arrEl of el) {
          acc[k].push(this.#isObj(arrEl) ? this.#handleRefs(arrEl) : arrEl);
        }
        continue;
      }
      acc[k] = this.#isObj(el) ? this.#handleRefs(el) : el;
    }
    return acc;
  }

}

module.exports = OpenApiJSONifier;