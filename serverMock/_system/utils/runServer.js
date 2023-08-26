const Http = require('node:http');
const Url = require('node:url');
const log = require('../lib/Logger');
const { HEADERS, METHODS_WITH_BODY } = require('../constants/index.js');

const serialize = (res) => {
  if (res?.__toJson__ === false) return res;
  return JSON.stringify(res);
}

const getBody = (req) => {
  const buffer = [];

  const parse = (data) => {
    try { return JSON.parse(data); }
    catch (e) { return data; }
  }

  return new Promise(async (resolve) => {
    try {
      for await (const chunk of req) buffer.push(chunk);
      const data = Buffer.concat(buffer).toString();
      resolve(parse(data));
    } catch (e) {
      log.red(e);
    }
  });
};

const send404 = (res) => {
  res.writeHead(404, HEADERS);
  res.end('Not found');
}

module.exports = (routing = {}, port) => {

  Http
    .createServer(async (req, res) => {

      const { method } = req;

      if (method === 'OPTIONS') {
        res.writeHead(200, HEADERS);
        res.end('ok');
        return;
      };

      const urlObj = Url.parse(req.url, true);
      const [endpoint, ...slashParams] = urlObj.path.split('?')[0].substring(1).split('/');

      if (!endpoint) {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({
          AVAILABLE_ENDPOINTS: Object.keys(routing).map(e => `/${e}`)
        }));
        return;
      }

      const controller = routing[endpoint];
      if (!controller) return send404(res);

      const methodFn = controller[method.toLowerCase()];
      if (!methodFn) return send404(res);

      const args = {
        slashParams,
        queryParams: urlObj.query,
        body: METHODS_WITH_BODY.has(method) ? await getBody(req) : undefined
      };

      let result;
      try { result = await methodFn(args); }
      catch (e) { log.red(e); }

      const response = (
        (result?.__toJson__ === false) ||
        result?.__status__ ||
        result?.__headers__
      ) ? result?.__data__ : result;

      res.writeHead(result?.__status__ || 200, {
        ...HEADERS,
        ...(result?.__headers__ || {})
      });
      res.end(serialize(response));

    })
    .listen(port)
    .addListener('listening', () => {
      log.green(`Mock server is started on http://localhost:${port}...`);
    })
    .addListener('error', () => {
      log.red('Сервер не запустился, вероятно, порт занят');
      process.exit();
    });
};