class Path {

  /**
   * replaces the first `/`
   * @param {string} path
   * @example
   * const p = normalize('/path');
   * p === 'path'; // true;
   */
  static normalize = (path) => path.replace('/', '');

  /**
   * gets the static part of the path (without dinamic parameters)
   * @param {string} path
   * @example
   * const static = pathToTs('path/subpath/{param}/{id}');
   * static === `path/subpath`; // true;
   */
  static static = (path) => path.split('/{')[0];

  /**
   * turns openapi path to typescript template string
   * @param {string} path
   * @example
   * const tsPath = pathToTs('path/{param}/{id}');
   * tsPath === `path/${string}/${string}`; // true;
   */
  static toTs = (path) => `\`${path.replaceAll(/{.*?}/g, '${string}')}\``;

}

module.exports = Path