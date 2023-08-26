const { Path, Template, Files } = require('../utils');

/**
 * Генерирует src/api/endpoints.ts файл,
 * в котором описываются, какие есть эндпойнты и методы на уровне js
 * @param {{ [k in 'paths' | 'components']: Record<string, any> }} openApiObj 
 */
function genOpenapiEndpoints(openApiObj) {

  const endpoints = Object.entries(openApiObj.paths).reduce((acc, [path, pathObj]) => {
    const endpointName = Path.static(Path.normalize(path));
    acc[endpointName] = Object.keys(pathObj).reduce((methods, method) => {
      methods.push(`'${method}'`);
      return methods;
    }, []);
    return acc;
  }, {});

  const content = JSON.stringify(endpoints, null, 2).replaceAll('"', '');

  const template = Template.content(
    `/** Говорит, какие есть эндпойнты и методы */\nexport const endpoints = ${content} as const;`
  );

  Files.write('../../src/api/endpoints.ts', template);  
}

module.exports = genOpenapiEndpoints;