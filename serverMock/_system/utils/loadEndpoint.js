const fsp = require('node:fs').promises;
const vm = require('node:vm');

module.exports = async (filePath, sandbox) => {
  const fileCode = (await fsp.readFile(filePath, 'utf8'))
    .split(': Params').join(''); // remove typescript
  const script = new vm.Script(fileCode);
  const context = vm.createContext(sandbox);
  return script.runInContext(context, { timeout: 5000, displayErrors: false });
};