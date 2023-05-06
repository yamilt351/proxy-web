import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdilewareDir = path.join(__dirname, './src/midlewares');


const importMidlewares = async () => {

  const middlewareFiles = await fs.promises.readdir(mdilewareDir);
  const midlewareArr = [];

  for (const file of middlewareFiles) {
    const middleware = await import(`./src/midlewares/${file}`);
    midlewareArr.push(middleware.default);
    console.log(midlewareArr);
  }

  return midlewareArr;
};

export default importMidlewares;
