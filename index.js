import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
// set up headers with helmet
app.use(helmet());
// log responses 
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

//proxy 
app.use("/", (req, res, next) => {
	try {
	  // split the url to proxy
    const url = (req.url || "").replace("/?url=", "");
    // create proxy 
    const proxy = createProxyMiddleware({
      target: url,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["content-security-policy"] =
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self'";
        proxyRes.headers["strict-transport-security"] =
          "max-age=63072000; includeSubDomains; preload";
      },
    });
    proxy(req, res, next);
  } catch (error) {
    console.error(error.message);
  }
});
app.listen(4000, () => {
  console.log("Proxy listening on port 4000...");
});
