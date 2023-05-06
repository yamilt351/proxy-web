import express from 'express';
import importMidlewares from './midlewareHandler.js';
import { HeaderXForwardedFor, hostHeader, proxy } from './src/proxy/proxy.js';

const app = express();
const middlewares = await importMidlewares();

//import middlewares
middlewares.forEach((middleware) => {
  app.use(middleware);
});

//proxy
app.use(hostHeader);
app.use(HeaderXForwardedFor);
app.use('/', proxy);

app.listen(4000, () => {
  console.log('Proxy listening on port 4000...');
});
