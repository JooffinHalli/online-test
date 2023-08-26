const { Template, Files } = require('../utils');

/** Генерирует src/api/openApi/index.ts файл */
function genOpenApiIndex() {
  const { repoLink, repoBranch } = this;
  Files.create('../../src/api/openApi');
  const template = Template.content(repoLink, repoBranch, content);
  Files.write('../../src/api/openApi/index.ts', template);
}
module.exports = genOpenApiIndex;

var content = `import { paths } from './paths';
import { components } from './components';

export const openapi = {
  paths,
  components
} as const;

export * from './types';`;