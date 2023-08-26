const PORT = 7777;

const HEADERS = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Expose-Headers': 'Content-Disposition',
  'Content-Type': 'application/json; charset=UTF-8'
};

const METHODS_WITH_BODY = {
  'POST': true,
  'PUT': true,
  'PATCH': true,
  'DELETE': true
};

METHODS_WITH_BODY.has = (method) => method in METHODS_WITH_BODY;

module.exports = { PORT, HEADERS, METHODS_WITH_BODY };