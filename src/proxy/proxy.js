import { createProxyMiddleware } from 'http-proxy-middleware';





function redirect(req, res, next) {
  res.redirect(
    `/${Object.keys(req.query)[0]}=${req.query[Object.keys(req.query)[0]]}`,
  );
}

function queryCheck(req, res, next) {
  console.log(req.query.path);
  if (req.query.path) {
    req.query.url += req.query.path;
    delete req.query.path;
    redirect(req, res, next);
    console.log(redirect(req, res, next));
    return;
  }
}

function urlCreation(req, res, next) {
  queryCheck(req, res, next);

  // split the url to proxy
  const url = (req.url || '').replace('/?url=', '');

  return url;
}

function proxyCreation(req, res, next) {
  const url = urlCreation(req, res, next);
  // create proxy
  const proxy = createProxyMiddleware({
    target: url,
    ws: true, // enable WebSocket proxying
    changeOrigin: true,
  });
  console.log(proxy);
  proxy(req, res, next);
}

export function proxy(req, res, next) {
  try {
    console.log('proxy sucess');
    proxyCreation(req, res, next);
  } catch (error) {
    console.error(error.message);
  }
}
