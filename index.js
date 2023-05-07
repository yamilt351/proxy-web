import express from 'express';
import importMidlewares from './midlewareHandler.js';
import { errorHandler } from './src/helper/errorHandler.js';
import { proxy } from './src/proxy/proxy.js';

const app = express();
const middlewares = await importMidlewares();

//import middlewares
middlewares.forEach((middleware) => {
  app.use(middleware);
});

//proxy
app.use('/', proxy);
app.use(errorHandler);
app.listen(4000, () => {
  console.log('Proxy listening on port 4000...');
});
