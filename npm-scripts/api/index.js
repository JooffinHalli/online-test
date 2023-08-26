const mainScript = require('./mainScript');

const [x, y, ...args] = process.argv;
const [repoLink, repoBranch] = args;

console.time('script took');

mainScript(repoLink, repoBranch);

console.timeEnd('script took');