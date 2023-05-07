import { createProxyMiddleware } from 'http-proxy-middleware';
import { parse } from 'url';

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

  // Parse the request URL
  const parsedUrl = parse(req.url, true);
  const url = 'https://www.lanacion.com.ar/';
  // Check if it's an asset request
  if (parsedUrl.pathname.startsWith('/assets/')) {
    // Return the asset URL, replacing '/assets/' with the desired base URL
    return url + parsedUrl.pathname.replace('/assets/', '/');
  }

  // Check if the query contains the desired parameter (e.g., 'url')
  if (parsedUrl.query && parsedUrl.query.url) {
    // Create a new URL object from the target URL
    const targetUrl = new URL(parsedUrl.query.url);

    // Update target URL's pathname and search with the original request's values
    targetUrl.pathname = parsedUrl.pathname;
    targetUrl.search = parsedUrl.search;

    // Return the formatted target URL
    if (
      parsedUrl.pathname === '/pf/resources/packages/css/homeln10-style.min.css'
    ) {
      targetUrl.search = '?d=1196';
    } else {
      targetUrl.search = parsedUrl.search;
    }

    return targetUrl.toString();
  } else {
    // Handle the case when the 'url' parameter is not present
    console.error('URL parameter is missing');
    return;
  }
}

function proxyCreation(req, res, next) {
  const url = urlCreation(req, res, next);

  if (!url) {
    // Handle the invalid URL case, e.g., return an error response
    res.status(400).send('Invalid URL');
    return;
  }

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
