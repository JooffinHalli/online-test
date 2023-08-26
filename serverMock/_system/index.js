const fs = require('node:fs');
const path = require('node:path');
const runServer = require('./utils/runServer');
const loadEndpoint = require('./utils/loadEndpoint');
const logger = require('./lib/Logger');
const store = require('../store/index.js');
const { PORT } = require('./constants/index.js');

const endpointsPath = path.join(process.cwd() + '/endpoints');

if (!fs.existsSync(endpointsPath)) {
  logger.red('нет ни одного эндпойнта');
  process.exit(0);
}

const routes = {};

const sandbox = {
  console: logger,
  store
};

const buildRoutes = async () => {
  try {
    const folders = await fs.promises.readdir(endpointsPath);
    
    for (const folderName of folders) {
      const filePath = path.join(endpointsPath, folderName + '/index.ts');
      if (fs.existsSync(filePath)) {
        routes[folderName] = await loadEndpoint(filePath, sandbox);
      }
    }
    
  }
  catch(e) {
    logger.red(e);
  }
}

buildRoutes();

runServer(routes, PORT);