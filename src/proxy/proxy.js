import { createProxyMiddleware } from 'http-proxy-middleware';

export function hostHeader(req, res, next) {
  // Obtiene el nombre de host del encabezado "Host" de la solicitud
  const hostHeader = req.headers.host;
  // Establece el encabezado "Host" en la solicitud al nombre de host obtenido anteriormente
  req.headers.host = hostHeader;
  console.log(hostHeader);
  next();
}

export function HeaderXForwardedFor(req, res, next) {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const clientIp = req.ip;
  console.log(clientIp);
  // Si no hay encabezado "X-Forwarded-For", agrega la dirección IP del cliente
  if (!xForwardedFor) {
    console.log('xForwardedFor false');
    req.headers['x-forwarded-for'] = clientIp;
  } else {
    console.log('xForwardedFor true');
    // Si ya hay un encabezado "X-Forwarded-For", agrega la dirección IP del cliente al final
    req.headers['x-forwarded-for'] = `${xForwardedFor}, ${clientIp}`;
  }

  next();
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

function redirect(req, res, next) {
  res.redirect(
    `/${Object.keys(req.query)[0]}=${req.query[Object.keys(req.query)[0]]}`,
  );
}

function urlCreation(req, res, next) {
  queryCheck(req, res, next);

  // split the url to proxy
  const url = (req.url || '').replace('/?url=', '');
  console.log(url);
  return url;
}

function proxyCreation(req, res, next) {
  const url = urlCreation(req, res, next);
  // create proxy
  const proxy = createProxyMiddleware({
    target: url,
    ws: true, // enable WebSocket proxying
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['content-security-policy'] =
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self'";
      proxyRes.headers['strict-transport-security'] =
        'max-age=63072000; includeSubDomains; preload';
    },
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
