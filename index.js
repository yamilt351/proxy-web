import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
// set up headers with helmet
app.use(helmet());
// log responses
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

//proxy
app.use((req, res, next) => {
  // Obtiene el nombre de host del encabezado "Host" de la solicitud
  const hostHeader = req.headers.host;
  // Establece el encabezado "Host" en la solicitud al nombre de host obtenido anteriormente
  req.headers.host = hostHeader;
  next();
});

app.use((req, res, next) => {
  // Verifica si ya existe un encabezado "X-Forwarded-For"
  const xForwardedFor = req.headers['x-forwarded-for'];
  const clientIp = req.ip;

  // Si no hay encabezado "X-Forwarded-For", agrega la dirección IP del cliente
  if (!xForwardedFor) {
    req.headers['x-forwarded-for'] = clientIp;
  } else {
    // Si ya hay un encabezado "X-Forwarded-For", agrega la dirección IP del cliente al final
    req.headers['x-forwarded-for'] = `${xForwardedFor}, ${clientIp}`;
  }

  next();
});

app.use('/', (req, res, next) => {
  try {
    if (req.query.path) {
      req.query.url += req.query.path;
      delete req.query.path;
      res.redirect(
        `/${Object.keys(req.query)[0]}=${req.query[Object.keys(req.query)[0]]}`,
      );
      return;
    }
    // split the url to proxy
    const url = (req.url || '').replace('/?url=', '');
    // create proxy
    const proxy = createProxyMiddleware({
      target: url,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['content-security-policy'] =
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self'";
        proxyRes.headers['strict-transport-security'] =
          'max-age=63072000; includeSubDomains; preload';
      },
    });
    proxy(req, res, next);
  } catch (error) {
    console.error(error.message);
  }
});
app.listen(4000, () => {
  console.log('Proxy listening on port 4000...');
});
